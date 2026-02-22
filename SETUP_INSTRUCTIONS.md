# Mami Papa Babies - Setup Instructions

## Prerequisites
- Node.js 16+ and npm/pnpm
- Supabase account with a project set up
- Wearemarz API credentials (already configured)

## Environment Variables
The following environment variables are already configured in your Vercel project:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `WEAREMARZ_API_KEY` - From your provided credentials
- `WEAREMARZ_API_SECRET` - From your provided credentials

## Initial Setup Steps

### 1. Install Dependencies
```bash
pnpm install
# or
npm install
```

### 2. Seed the Admin User
The admin user credentials are:
- **Email**: barbarakatusabe999@gmail.com
- **Password**: QWer12@*

To seed the admin user, run:
```bash
node scripts/seed-admin.js
```

### 3. Seed Sample Products (Optional)
To add sample products for testing:
```bash
node scripts/seed-products.js
```

### 4. Run Development Server
```bash
pnpm dev
# or
npm run dev
```

The application will be available at `http://localhost:3000`

## Access Points

### Storefront
- **URL**: `http://localhost:3000`
- Browse and purchase baby products
- Add products to cart
- Complete checkout with payment options (MTN, Airtel, Bank)

### Admin Dashboard
- **URL**: `http://localhost:3000/admin/login`
- **Email**: barbarakatusabe999@gmail.com
- **Password**: QWer12@*
- Add/edit/delete products
- Upload product images
- View and manage orders

## Features

### Customer Features
- Browse baby products in a responsive grid (2 cols mobile, 3 cols tablet, 4 cols desktop)
- Add products to shopping cart (stored in browser localStorage)
- View cart with quantity adjustments
- Checkout with customer details
- Multiple payment methods: MTN, Airtel, Bank Transfer
- Order confirmation with WhatsApp integration
- Meta Pixel tracking for purchase analytics
- Google Ads tracking

### Admin Features
- Secure login with email and password
- Product management (add, edit, delete)
- Image upload for products (stored in `/public/products/`)
- Order management and tracking
- View customer details and order history

## Database Schema

The application uses Supabase PostgreSQL with the following tables:
- **admins**: Admin user credentials
- **products**: Product information and pricing
- **orders**: Customer orders with payment status
- **order_items**: Individual items in each order

## Payment Integration

### Wearemarz Wallet API
- Endpoint: `https://wallet.wearemarz.com/api/v1`
- Supported methods: MTN, Airtel, Bank Transfer
- Webhook endpoint: `/api/webhooks/payment`

### Meta Pixel
- Pixel ID: 2621239424886813
- Tracks purchase events for analytics

### Google Ads Manager
- Conversion ID: AW-17957602155
- Tracks checkout and purchase events

## WhatsApp Integration

After successful purchase, customers can contact support via WhatsApp:
- **Number**: +256753979539
- Pre-filled message includes: customer name, products, quantities, and total amount

## Troubleshooting

### Admin Login Not Working
- Verify the admin user was seeded correctly
- Check that Supabase is connected and tables are created

### Products Not Showing
- Ensure seed-products.js has been run
- Check that products table is populated in Supabase

### Payment Issues
- Verify WEAREMARZ_API_KEY and WEAREMARZ_API_SECRET are set
- Check that the Wearemarz API endpoint is accessible

### Image Upload Issues
- Ensure `/public/products/` directory exists (it should)
- Check file permissions in the public folder

## Support
For issues or questions, contact: barbarakatusabe999@gmail.com
