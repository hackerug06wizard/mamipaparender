# WhatsApp Integration Guide

## Overview

The Mami Papa Babies store includes an automatic floating WhatsApp button that appears after customers complete their purchases. This provides seamless post-purchase communication.

---

## How It Works

### 1. **Purchase Flow**
   - Customer adds items to cart
   - Proceeds to checkout
   - Enters delivery information
   - Selects payment method (MTN/Airtel/Bank)
   - Completes payment with Wearemarz API

### 2. **Order Confirmation Page**
   - Customer lands on success page showing order details
   - `sessionStorage` saves order data including:
     - Order ID
     - Customer name
     - Items purchased (with quantities)
     - Total amount

### 3. **WhatsApp Button Activation**
   - Floating green button appears in bottom-right corner
   - Shows animated bounce effect
   - Displays order summary card above button
   - Pre-fills message with all order details

### 4. **Message Content**
   The message sent to WhatsApp includes:
   ```
   Hello Mami Papa Babies!
   
   I just purchased from your store:
   • Baby Stroller (Qty: 1)
   • Crib Bedding Set (Qty: 2)
   
   Total: UGX 420,000
   Customer Name: John Doe
   Order ID: #12345
   
   Please confirm my order.
   ```

---

## Technical Implementation

### File: `/components/whatsapp-button.tsx`

This client-side component:
- Checks for `last_order` in sessionStorage
- Renders floating button only if order exists
- Generates dynamic WhatsApp message
- Opens WhatsApp with pre-filled text
- Auto-dismissible with close button

### Key Features

**Styling**
- Fixed position bottom-right (z-index: 50)
- Responsive padding (bottom-4, right-4)
- Green WhatsApp brand color (#22c55e)
- Hover effects and animations
- Mobile-friendly button size (64px)

**User Experience**
- Animated slide-up effect on appearance
- Bounce animation on button
- Visible order summary
- One-click message send
- Close button to dismiss

**Message Customization**
```typescript
const generateMessage = () => {
  const items = orderData.items
    .map((item) => `• ${item.product_name} (Qty: ${item.quantity})`)
    .join('%0A');

  const message = `Hello Mami Papa Babies!%0A%0AI just purchased from your store:%0A${items}...`;
  return message;
};
```

---

## Configuration

### WhatsApp Number
The phone number is configured in the component:
- **Number**: 256753979539 (without + symbol)
- **Format**: International format for WhatsApp API
- **Location**: `components/whatsapp-button.tsx` line 58

To change the WhatsApp number, update:
```typescript
const whatsappNumber = '256753979539';
```

### Styling Customization

**Button Colors**
Edit the className in `whatsapp-button.tsx`:
```jsx
// Currently: bg-green-500 hover:bg-green-600
className="...bg-green-500 hover:bg-green-600..."
```

**Button Size**
```jsx
// Currently: w-16 h-16 (64px)
className="...w-16 h-16..."
```

**Position**
```jsx
// Bottom-right corner (can change to left, top, etc)
<div className="fixed bottom-4 right-4 z-50..."
```

---

## Integration Points

### 1. **Order Creation** (`components/checkout-form.tsx`)
```typescript
sessionStorage.setItem(
  'last_order',
  JSON.stringify({
    order_id: data.order_id,
    customer_name: formData.customer_name,
    customer_phone: formData.customer_phone,
    items: cart,
    total: totalPrice,
  })
);
```

### 2. **Layout Integration** (`app/layout.tsx`)
```typescript
import WhatsAppButton from '@/components/whatsapp-button'

// In RootLayout body:
<WhatsAppButton />
```

### 3. **Order Success Page** (`app/order-success/[id]/page.tsx`)
- Displays order confirmation
- WhatsApp button appears automatically via layout
- User can immediately message about their order

---

## Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✓ Yes | Full support |
| Firefox | ✓ Yes | Full support |
| Safari | ✓ Yes | Full support |
| Mobile Safari | ✓ Yes | Opens WhatsApp app |
| Chrome Mobile | ✓ Yes | Opens WhatsApp app |
| WhatsApp Web | ✓ Yes | Links to conversation |

---

## Security & Privacy

### Data Handling
- Order data stored in `sessionStorage` (not localStorage)
- Data cleared when session ends
- No sensitive information shared (no payment details)
- Only customer name, items, and total sent

### Privacy Considerations
- Users must consent to open WhatsApp
- Message content is visible before sending
- No automatic sending - manual user action required
- Users can close button without messaging

---

## Analytics Integration

The WhatsApp button works alongside other tracking:

### Meta Pixel
- Tracks button clicks as custom events
- Records WhatsApp conversions

### Google Ads
- Tracks post-purchase engagement
- Records WhatsApp click-through

To add custom tracking:
```typescript
// In whatsapp-button.tsx
const handleWhatsAppClick = () => {
  // Add tracking
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('trackCustom', 'WhatsAppClick');
  }
  // Open WhatsApp...
};
```

---

## Testing the Integration

### Step 1: Place a Test Order
1. Go to http://localhost:3000
2. Add products to cart
3. Proceed to checkout
4. Enter test customer details
5. Complete mock payment

### Step 2: Verify WhatsApp Button
1. Check order success page
2. Look for floating green button in bottom-right
3. Verify order summary card displays
4. Click button to test message

### Step 3: Check Message Content
1. Open WhatsApp (web or app)
2. Verify message contains:
   - ✓ All purchased items
   - ✓ Correct quantities
   - ✓ Correct total amount
   - ✓ Customer name
   - ✓ Order ID

### Step 4: Mobile Testing
1. Test on mobile device
2. Verify button size and position
3. Test that WhatsApp app opens (if installed)
4. Verify message pre-fills correctly

---

## Advanced: Custom Message Template

To modify the message template, edit the `generateMessage()` function:

```typescript
const generateMessage = () => {
  const itemsList = orderData.items
    .map((item) => 
      `• ${item.product_name} x${item.quantity} - UGX ${item.price}`
    )
    .join('\n');

  const customMessage = `
Dear Mami Papa Babies,

Thank you for my order! Here are my purchase details:

${itemsList}

Order Total: UGX ${orderData.total_amount}
Order ID: #${orderData.id}

Please confirm receipt and provide delivery details.

Best regards,
${orderData.customer_name}
  `.trim();

  return encodeURIComponent(customMessage);
};
```

---

## Troubleshooting

### Button Not Appearing
**Issue**: WhatsApp button doesn't show after purchase
**Solutions**:
1. Check if order data is saved to sessionStorage
   - Open browser DevTools → Application → Session Storage
   - Look for `last_order` key
2. Check browser console for JavaScript errors
3. Verify `WhatsAppButton` is imported in layout.tsx
4. Clear browser cache and reload

### Message Not Pre-filling
**Issue**: WhatsApp message is empty
**Solutions**:
1. Verify `orderData` contains correct structure
2. Check `generateMessage()` function
3. Inspect network requests to see saved order data
4. Test with simple message first

### Button Position Issues
**Issue**: Button overlaps content
**Solutions**:
1. Adjust z-index in `whatsapp-button.tsx`
2. Change position (bottom-4, right-4) values
3. Adjust for mobile screens with responsive classes
4. Test different viewport sizes

### Mobile App Doesn't Open
**Issue**: Clicking button opens browser instead of app
**Solutions**:
1. Verify WhatsApp is installed on device
2. Check if using correct WhatsApp URL format
3. For web: message opens WhatsApp Web
4. Test on different mobile platforms

---

## Future Enhancements

Possible improvements for the WhatsApp integration:

1. **Multiple Contact Options**
   - Support different WhatsApp numbers for different regions
   - Route messages based on customer location

2. **Rich Media Support**
   - Send product images with messages
   - Include payment receipt/invoice

3. **Automated Follow-up**
   - Send follow-up message after 24 hours
   - Request product feedback

4. **CRM Integration**
   - Sync customer data to WhatsApp Business API
   - Track conversation history in CRM

5. **Delivery Tracking**
   - Include tracking link in message
   - Real-time delivery updates

---

## Support

For issues or questions about WhatsApp integration:
1. Check browser console for errors
2. Verify order data in sessionStorage
3. Test URL encoding of message
4. Review WhatsApp API documentation
5. Check WhatsApp phone number format

---

**Configuration Summary**
- **Component**: `components/whatsapp-button.tsx`
- **WhatsApp Number**: +256 753 979 539
- **Storage**: sessionStorage (last_order)
- **Position**: Fixed bottom-right
- **Display Trigger**: After purchase completion
- **Message Type**: Pre-filled with order details

Your WhatsApp integration is ready to connect with customers! 🎉
