# Quick Start Guide - Mami Papa Babies

## Prerequisites
- Node.js 16+ installed
- Supabase project set up
- Vercel project with environment variables configured

## Step 1: Install Dependencies
```bash
pnpm install
```

## Step 2: Start Development Server
```bash
pnpm dev
```

The app will be available at `http://localhost:3000`

## Step 3: Access the Application

### Browse Products
- **URL**: http://localhost:3000
- View baby products in a beautiful responsive grid
- Add items to your cart

### Admin Login
- **URL**: http://localhost:3000/admin/login
- **Email**: barbarakatusabe999@gmail.com
- **Password**: QWer12@*
- Manage products and orders

## Key URLs

| Feature | URL |
|---------|-----|
| Storefront | http://localhost:3000 |
| Shopping Cart | http://localhost:3000/cart |
| Checkout | http://localhost:3000/checkout |
| Admin Login | http://localhost:3000/admin/login |
| Admin Dashboard | http://localhost:3000/admin/dashboard |

## Features Checklist

- ✓ Product browsing with responsive grid (2/3/4 columns)
- ✓ Shopping cart with add/remove/quantity controls
- ✓ Checkout form with customer details
- ✓ Payment integration (MTN, Airtel, Bank)
- ✓ Order confirmation page
- ✓ WhatsApp integration for post-purchase
- ✓ Admin dashboard for product management
- ✓ Admin order tracking
- ✓ Meta Pixel tracking
- ✓ Google Ads tracking
- ✓ Email notification system

## Admin Features

### Add a New Product
1. Login to admin dashboard
2. Click "Add New Product"
3. Fill in:
   - Product name
   - Price
   - Description (optional)
   - Upload product image
4. Click "Add Product"

### View Orders
1. Navigate to "Orders" tab in admin dashboard
2. See all customer orders with payment status
3. View order details including items and customer info

### Manage Products
1. View all products in product list
2. Edit product details
3. Delete products (image will remain)
4. Update pricing and descriptions

## Payment Methods
The system supports three payment methods:
1. **MTN Mobile Money** - Fast and convenient
2. **Airtel Money** - Alternative mobile payment
3. **Bank Transfer** - For larger purchases

## Customer Journey

1. **Browse** - Customer views products on homepage
2. **Add to Cart** - Customer adds items to their shopping cart
3. **Checkout** - Customer fills in details and chooses payment method
4. **Pay** - Payment processed through Wearemarz Wallet API
5. **Confirm** - Customer sees order confirmation
6. **WhatsApp** - Customer contacts via WhatsApp for delivery details
7. **Delivery** - Products shipped within 1-2 business days

## Common Tasks

### Reset Admin Password
If you need to reset the admin password:
1. Go to Supabase dashboard
2. Find the `admins` table
3. Delete the current admin record
4. Run: `node scripts/seed-admin.js`

### Add Sample Products
```bash
node scripts/seed-products.js
```

### View Database
1. Go to your Supabase dashboard
2. Navigate to SQL Editor or Table Editor
3. View `products`, `orders`, and `order_items` tables

## Troubleshooting

**Issue**: Products not showing
- **Solution**: Run `node scripts/seed-products.js` to add sample products

**Issue**: Admin login fails
- **Solution**: Verify database connection and run seed-admin.js again

**Issue**: Payment not working
- **Solution**: Check WEAREMARZ_API_KEY and WEAREMARZ_API_SECRET environment variables

**Issue**: Images not uploading
- **Solution**: Verify `/public/products/` folder exists and is writable

## Support
For questions or issues:
- Email: barbarakatusabe999@gmail.com
- WhatsApp: +256753979539

---

**Next Steps**: Review the full PROJECT_SUMMARY.md and SETUP_INSTRUCTIONS.md for detailed information.
