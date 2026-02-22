# Mami Papa Babies - E-Commerce Platform

## Project Overview
A fully-featured e-commerce website for selling baby products with secure authentication, payment processing, and comprehensive admin management capabilities.

## Technology Stack
- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase PostgreSQL
- **Payments**: Wearemarz Wallet API (MTN, Airtel, Bank)
- **Analytics**: Meta Pixel, Google Ads Manager
- **Authentication**: Session-based with bcrypt

## Project Structure

```
/app
├── page.tsx                 # Storefront homepage
├── cart/
│   └── page.tsx           # Shopping cart page
├── checkout/
│   └── page.tsx           # Checkout page
├── order-success/
│   └── [id]/page.tsx      # Order confirmation page
├── admin/
│   ├── login/
│   │   └── page.tsx       # Admin login
│   └── dashboard/
│       └── page.tsx       # Admin dashboard
├── api/
│   ├── auth/
│   │   ├── login/route.ts
│   │   ├── logout/route.ts
│   │   └── check-session/route.ts
│   ├── products/
│   │   ├── route.ts       # List/create products
│   │   └── [id]/route.ts  # Get/update/delete product
│   ├── orders/
│   │   ├── route.ts       # List orders
│   │   └── create-payment/route.ts  # Create payment
│   └── webhooks/
│       └── payment/route.ts # Payment status webhook
└── layout.tsx             # Root layout with Meta Pixel & GA4

/components
├── header.tsx             # Navigation header
├── product-grid.tsx       # Product listing grid
├── product-card.tsx       # Individual product card
├── cart-view.tsx          # Shopping cart component
├── checkout-form.tsx      # Checkout form
├── footer.tsx             # Footer
└── admin/
    ├── admin-layout.tsx   # Admin wrapper
    ├── admin-dashboard.tsx
    ├── login-form.tsx
    ├── product-management.tsx
    └── order-management.tsx

/lib
├── supabase-client.ts     # Supabase configuration
├── auth-middleware.ts     # Session handling
├── use-cart.ts            # Cart state management hook
├── analytics.ts           # Meta Pixel & GA4 tracking
└── email-service.ts       # Email notifications

/public
├── logo.png               # Brand logo
└── products/              # Uploaded product images

/scripts
├── 01-create-tables.sql   # Database schema
├── seed-admin.js          # Seed admin user
└── seed-products.js       # Seed sample products
```

## Key Features

### Customer Features
1. **Product Browsing**
   - Responsive grid layout (2 cols mobile, 3 cols tablet, 4 cols desktop)
   - Product details with images and pricing
   - Easy navigation and search

2. **Shopping Cart**
   - Add/remove products
   - Quantity adjustment
   - Persistent cart (localStorage)
   - Real-time total calculation

3. **Checkout & Payment**
   - Customer information form
   - Multiple payment methods (MTN, Airtel, Bank)
   - Integration with Wearemarz Wallet API
   - Order tracking

4. **Post-Purchase**
   - Order confirmation page
   - WhatsApp integration (+256753979539)
   - Pre-filled purchase details
   - Email notifications

5. **Analytics**
   - Meta Pixel tracking (ID: 2621239424886813)
   - Google Ads tracking (AW-17957602155)
   - Purchase event tracking
   - Cart abandonment tracking

### Admin Features
1. **Authentication**
   - Secure login with email/password
   - Session-based authentication
   - Default credentials: barbarakatusabe999@gmail.com / QWer12@*

2. **Product Management**
   - Add new products with name, description, price
   - Upload product images
   - Edit product details
   - Delete products
   - Image storage in `/public/products/`

3. **Order Management**
   - View all orders
   - Order details with customer info
   - Payment status tracking
   - Order history

## Database Schema

### admins Table
```sql
id (BIGSERIAL PRIMARY KEY)
email (VARCHAR UNIQUE)
password_hash (VARCHAR)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### products Table
```sql
id (BIGSERIAL PRIMARY KEY)
name (VARCHAR NOT NULL)
description (TEXT)
price (DECIMAL)
image_url (VARCHAR)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### orders Table
```sql
id (BIGSERIAL PRIMARY KEY)
customer_name (VARCHAR NOT NULL)
customer_email (VARCHAR NOT NULL)
customer_phone (VARCHAR)
total_amount (DECIMAL)
payment_status (VARCHAR)
payment_method (VARCHAR)
transaction_id (VARCHAR)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### order_items Table
```sql
id (BIGSERIAL PRIMARY KEY)
order_id (BIGINT FK -> orders)
product_id (BIGINT FK -> products)
product_name (VARCHAR)
price (DECIMAL)
quantity (INT)
created_at (TIMESTAMP)
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/check-session` - Check admin session

### Products
- `GET /api/products` - List products
- `POST /api/products` - Create product (admin only)
- `GET /api/products/[id]` - Get product details
- `PUT /api/products/[id]` - Update product (admin only)
- `DELETE /api/products/[id]` - Delete product (admin only)

### Orders
- `GET /api/orders` - List orders (admin only)
- `POST /api/orders/create-payment` - Create order & initiate payment

### Webhooks
- `POST /api/webhooks/payment` - Payment status callback

## Payment Integration

### Wearemarz Wallet API
- **Base URL**: https://wallet.wearemarz.com/api/v1
- **Authentication**: Basic Auth with API Key & Secret
- **Endpoint**: POST /collect-money
- **Supported Methods**: MTN, Airtel, Bank Transfer
- **Callback**: Configured for payment status updates

### Request Format
```json
{
  "amount": 50000,
  "currency": "UGX",
  "phone_number": "256753979539",
  "reference": "order_123",
  "description": "Order #123 - Customer Name",
  "payment_method": "mtn"
}
```

## Analytics Tracking

### Meta Pixel Events
- **Page View**: Automatically on every page
- **View Content**: When product is viewed
- **Add to Cart**: When item added to cart
- **Purchase**: When order is completed

### Google Ads Events
- **Page View**: Automatically on every page
- **Add to Cart**: When item added to cart
- **Begin Checkout**: When checkout initiated
- **Purchase**: When order is completed

## Email Notifications

### Configured (Ready for Integration)
The system logs all email intentions. To enable actual email delivery:
1. Choose email service (SendGrid, AWS SES, Nodemailer, etc.)
2. Update `/lib/email-service.ts` with service integration
3. Add API keys to environment variables

### Email Types
- Order confirmation (to customer)
- Admin notification (to barbarakatusabe999@gmail.com)

## WhatsApp Integration
- **Contact Number**: +256753979539
- **Trigger**: After successful order
- **Pre-filled Message**: Includes customer details, products, quantities, and total
- **Implementation**: Uses WhatsApp Web URL scheme

## Responsive Design
- **Mobile (0-768px)**: 2 products per row
- **Tablet (768px-1024px)**: 3 products per row
- **Desktop (1024px+)**: 4 products per row
- All pages optimized for touch and mouse interaction

## Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
WEAREMARZ_API_KEY
WEAREMARZ_API_SECRET
```

## Getting Started

### Installation
```bash
pnpm install
```

### Seed Admin User
```bash
node scripts/seed-admin.js
```

### Seed Sample Products (Optional)
```bash
node scripts/seed-products.js
```

### Development
```bash
pnpm dev
```

### Build & Deploy
```bash
pnpm build
pnpm start
```

## Security Features
- Password hashing with bcrypt
- Session-based authentication
- Protected admin routes
- Secure payment processing
- Input validation on all forms
- CSRF protection via Next.js
- Secure cookies with HTTP-only flag

## Performance Optimizations
- Server-side rendering where applicable
- Image optimization
- Code splitting
- Caching strategies
- Database indexing on frequently queried fields
- Responsive image loading

## Future Enhancements
1. Email service integration
2. SMS notifications
3. Inventory management
4. Product reviews/ratings
5. Customer accounts & order history
6. Coupon/discount system
7. Multiple currency support
8. Advanced analytics dashboard
9. Product recommendations
10. Bulk order management

## Support & Contact
- **Admin Email**: barbarakatusabe999@gmail.com
- **Customer Support**: Via WhatsApp +256753979539
- **Business Email**: barbarakatusabe999@gmail.com

## Deployment
The application is ready for deployment on Vercel or any Node.js hosting platform. Ensure all environment variables are properly configured before deployment.
