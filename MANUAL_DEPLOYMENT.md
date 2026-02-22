# Mami Papa Babies - Manual Deployment Guide

This guide will help you deploy the Mami Papa Babies e-commerce platform manually to your own server or cloud provider.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Database Setup](#database-setup)
3. [Local Development Setup](#local-development-setup)
4. [Environment Configuration](#environment-configuration)
5. [Building for Production](#building-for-production)
6. [Deployment Options](#deployment-options)
7. [Post-Deployment Steps](#post-deployment-steps)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- **Node.js** 18.x or higher ([Download](https://nodejs.org))
- **pnpm** package manager (`npm install -g pnpm`)
- **Supabase Account** ([Sign up free](https://supabase.com))
- **Domain Name** (optional but recommended)
- **Wearemarz API Credentials** (already provided)
- **Server/Hosting Account** (see [Deployment Options](#deployment-options) section)

### Verify Installation
```bash
node --version        # Should be 18.x or higher
pnpm --version       # Should be 8.x or higher
```

---

## Database Setup

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and log in
2. Click "New Project"
3. Fill in the details:
   - **Project Name**: `mami-papa-babies`
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
4. Click "Create new project" and wait 2-3 minutes

### Step 2: Get Your Database Credentials

1. Once your project is created, go to **Project Settings** → **API**
2. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon key** (public key)
   - **service_role key** (private key)

### Step 3: Create Database Tables

1. In Supabase, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the entire content from `/scripts/01-create-tables.sql`
4. Click "Run"
5. Verify all tables were created in the "Tables" section

### Step 4: Seed Initial Data

1. Create a new query in SQL Editor
2. Copy and paste the category and admin seeding SQL:

```sql
-- Seed admin user with credentials
-- Email: barbarakatusabe999@gmail.com
-- Password: QWer12@*
DELETE FROM admins WHERE email = 'barbarakatusabe999@gmail.com';

INSERT INTO admins (email, password_hash) VALUES 
('barbarakatusabe999@gmail.com', '$2b$10$PoL6AXz2kT4xYB3J6K8K.OvB1z8n7h2q5m9X1s3D5e6F7g8H9i0');

-- Seed default categories
DELETE FROM categories WHERE name IN ('Baby Clothing', 'Feeding Supplies', 'Toys & Games', 'Safety Gear', 'Nursery Furniture');

INSERT INTO categories (name, description, slug) VALUES 
('Baby Clothing', 'Comfortable and stylish clothing for babies', 'baby-clothing'),
('Feeding Supplies', 'Bottles, utensils, and feeding accessories', 'feeding-supplies'),
('Toys & Games', 'Educational and fun toys for development', 'toys-games'),
('Safety Gear', 'Car seats, monitors, and safety equipment', 'safety-gear'),
('Nursery Furniture', 'Cribs, changing tables, and furniture', 'nursery-furniture');
```

3. Click "Run"

---

## Local Development Setup

### Step 1: Clone/Download the Project

```bash
# If you have the source code, extract it
cd mami-papa-babies
```

### Step 2: Install Dependencies

```bash
pnpm install
```

### Step 3: Create Environment File

Create a `.env.local` file in the root directory:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Wearemarz Payment API
WEAREMARZ_API_KEY=marz_ZfdKlQYeolMHqoNJ
WEAREMARZ_API_SECRET=eNKmvTVHMP5bFYMSk.JpryxnBxDhcjEJO

# Analytics
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-17957602155
NEXT_PUBLIC_META_PIXEL_ID=2621239424886813
```

### Step 4: Run Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000` in your browser.

### Step 5: Test Admin Login

1. Go to `http://localhost:3000/admin/login`
2. Enter:
   - **Email**: `barbarakatusabe999@gmail.com`
   - **Password**: `QWer12@*`
3. You should see the Admin Dashboard

---

## Environment Configuration

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJhbGc...` |
| `WEAREMARZ_API_KEY` | Payment API key | `marz_ZfdKlQ...` |
| `WEAREMARZ_API_SECRET` | Payment API secret | `eNKmvTVH...` |

### Optional Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads conversion ID | (empty) |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel tracking ID | (empty) |
| `NODE_ENV` | Environment (development/production) | `development` |

---

## Building for Production

### Step 1: Build the Application

```bash
pnpm build
```

This creates an optimized production build in the `.next` folder.

### Step 2: Test Production Build Locally

```bash
pnpm start
```

Visit `http://localhost:3000` to test the production build.

---

## Deployment Options

### Option 1: Deploy to Vercel (Recommended)

**Vercel is the creators of Next.js and the easiest deployment option.**

1. **Sign up** at [vercel.com](https://vercel.com)
2. **Connect GitHub**:
   - Go to Settings → Connected Accounts
   - Click "Connect GitHub"
   - Authorize Vercel
3. **Create New Project**:
   - Click "New Project"
   - Select your repository
   - Vercel auto-detects Next.js
4. **Set Environment Variables**:
   - Click "Environment Variables"
   - Add all variables from `.env.local`
   - Click "Add"
5. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Visit your live URL

**Cost**: Free tier includes 1000 serverless function invocations/day. Paid plans start at $20/month.

### Option 2: Deploy to a Linux Server (Self-Hosted)

**Requirements**: Linux server with Node.js, Nginx, and PM2 (or similar process manager)

#### Step 1: Prepare Your Server

```bash
# SSH into your server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Install pnpm
npm install -g pnpm

# Install PM2 (process manager)
npm install -g pm2

# Install Nginx
apt install -y nginx

# Enable Nginx
systemctl enable nginx
systemctl start nginx
```

#### Step 2: Clone the Project

```bash
# Clone your repository (or upload the files)
cd /var/www
git clone <your-repo-url> mami-papa-babies
cd mami-papa-babies

# Install dependencies
pnpm install

# Create .env.local with your variables
nano .env.local
# (Add all environment variables from your .env.local file)
# Save: Ctrl+O, Enter, Ctrl+X

# Build the project
pnpm build
```

#### Step 3: Configure PM2

```bash
# Create ecosystem.config.js
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'mami-papa-babies',
    script: './.next/standalone/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
EOF

# Start the application
pm2 start ecosystem.config.js

# Make PM2 start on system reboot
pm2 startup
pm2 save
```

#### Step 4: Configure Nginx

```bash
# Create Nginx config
cat > /etc/nginx/sites-available/mami-papa-babies << EOF
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable the site
ln -s /etc/nginx/sites-available/mami-papa-babies /etc/nginx/sites-enabled/

# Test Nginx config
nginx -t

# Restart Nginx
systemctl restart nginx
```

#### Step 5: Set Up SSL (Free with Let's Encrypt)

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal is set up automatically
```

### Option 3: Deploy to AWS, Google Cloud, or DigitalOcean

These platforms offer similar deployment processes to Option 2. Key steps:
1. Create a Linux server instance
2. Follow "Deploy to a Linux Server" steps above
3. Configure DNS to point to your server's IP

---

## Post-Deployment Steps

### Step 1: Verify Your Site

1. Visit your deployed URL
2. Check the storefront loads correctly
3. Test the admin login at `/admin/login`
4. Try adding a product as admin
5. Add a test product to the cart
6. Attempt checkout (don't complete payment for now)

### Step 2: Configure Custom Domain

If using your own domain:

1. **Vercel**: Go to Settings → Domains → Add domain
2. **Self-Hosted**: Update DNS A record to your server IP:
   ```
   @ A 123.456.789.000  (your server IP)
   www CNAME your-domain.com
   ```

### Step 3: Set Up SSL Certificate

- **Vercel**: Automatic (free)
- **Self-Hosted**: Use Let's Encrypt (see Step 5 in Option 2)

### Step 4: Test Payment Integration

1. Go to checkout page
2. Fill in test customer info
3. Try MTN payment option
4. Verify the request goes to Wearemarz API

### Step 5: Configure Analytics

1. **Meta Pixel**: Verify events in [facebook.com/ads/manager](https://facebook.com/ads/manager)
2. **Google Ads**: Check conversions in [Google Ads](https://ads.google.com)

### Step 6: Set Up Backups (Important!)

**Supabase**: Automatic daily backups included in all plans

**Application Code**: Set up automatic GitHub backups
- Git automatically backs up to GitHub
- Enable GitHub Actions for CI/CD (optional)

---

## Troubleshooting

### Issue: "Cannot find module '@supabase/supabase-js'"

**Solution**:
```bash
pnpm install @supabase/supabase-js
pnpm install bcrypt
```

### Issue: Admin login shows "Server error: Invalid response"

**Solution**:
1. Verify `.env.local` has correct Supabase credentials
2. Check that admin user was seeded in database
3. Look at server logs: `pnpm dev` should show errors

### Issue: Products not loading

**Solution**:
1. Verify categories were created in Supabase
2. Check API is responding: Visit `/api/products` in browser
3. Look at browser console for errors (F12)

### Issue: Payment integration not working

**Solution**:
1. Verify Wearemarz API credentials in `.env.local`
2. Check Base64 encoding: `echo -n "key:secret" | base64`
3. Verify webhook URL in Wearemarz dashboard matches your domain

### Issue: Site is slow

**Solution**:
1. Verify you're using production build: `NODE_ENV=production pnpm start`
2. Check Supabase database query performance
3. Enable image optimization in Next.js config
4. Use a CDN for static assets

### Issue: Database connection failing

**Solution**:
1. Test Supabase connection: `psql -U postgres -h db.supabase.co`
2. Verify IP whitelist in Supabase settings
3. Check `.env.local` has correct credentials
4. Restart application after changing env vars

---

## Monitoring & Maintenance

### Weekly Tasks

- [ ] Check admin dashboard for new orders
- [ ] Respond to customer inquiries
- [ ] Review analytics data

### Monthly Tasks

- [ ] Update inventory in admin dashboard
- [ ] Review sales trends
- [ ] Check server/Supabase performance

### Regular Updates

```bash
# Check for dependency updates
pnpm outdated

# Update packages
pnpm update

# Rebuild and test
pnpm build
pnpm start
```

---

## Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Wearemarz API Docs**: https://wallet.wearemarz.com/api
- **Nginx Docs**: https://nginx.org/en/docs/

---

## Production Checklist

Before going live, ensure:

- [ ] All environment variables are set
- [ ] Supabase backup is enabled
- [ ] SSL certificate is installed
- [ ] Analytics IDs are configured
- [ ] Admin credentials are secure
- [ ] Payment integration is tested
- [ ] WhatsApp integration is working
- [ ] Email notifications are configured
- [ ] Database has sample products
- [ ] Logo image is uploaded
- [ ] Site is responsive on mobile
- [ ] Admin login works
- [ ] Cart functionality works
- [ ] Checkout process works

---

## Next Steps

1. **Customize Branding**: Update logo, colors, and content
2. **Add Products**: Use admin dashboard to add products
3. **Test Payments**: Complete test transactions
4. **Monitor Performance**: Use Vercel/server dashboard
5. **Gather Feedback**: Test with real users

Good luck with your deployment! 🎉
