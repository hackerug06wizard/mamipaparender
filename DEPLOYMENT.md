# Deployment Guide - Mami Papa Babies

## Pre-Deployment Checklist

- [ ] All code committed to GitHub
- [ ] Environment variables configured in Vercel
- [ ] Database migrations completed in Supabase
- [ ] Admin user seeded (barbarakatusabe999@gmail.com)
- [ ] Sample products seeded (optional)
- [ ] All tests passing locally
- [ ] Production build tested locally (`pnpm build && pnpm start`)

## Deploying to Vercel

### Step 1: Connect Repository
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select the project

### Step 2: Configure Environment Variables
In Vercel dashboard, add these environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
WEAREMARZ_API_KEY=your_api_key
WEAREMARZ_API_SECRET=your_api_secret
```

### Step 3: Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Access your deployed app

## Alternative Deployment Options

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Self-Hosted (VPS/Ubuntu)
```bash
# Update system
sudo apt update && sudo apt upgrade

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone <your-repo-url>
cd mami-papa-babies

# Install dependencies
npm install

# Build
npm run build

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Install PM2 for process management
npm install -g pm2
pm2 start "npm start" --name "mami-papa"
pm2 save
pm2 startup

# Optional: Set up Nginx reverse proxy
sudo apt install nginx
# Configure Nginx to proxy to port 3000
```

### Railway Deployment
1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Select your repository
5. Add environment variables in the dashboard
6. Deploy

### Heroku Deployment (Legacy)
Note: Heroku free tier is discontinued. Use alternatives above.

## Database Setup for Production

### Supabase
1. Create a new Supabase project
2. Run the SQL migrations from `scripts/01-create-tables.sql`
3. Seed admin user:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_url SUPABASE_SERVICE_ROLE_KEY=your_key node scripts/seed-admin.js
   ```

### Backing Up Your Database
```bash
# Using Supabase CLI
supabase db pull > backup.sql

# Using PostgreSQL
pg_dump postgres://user:password@host/db > backup.sql
```

## Environment Variables for Production

```env
# Supabase (from Supabase Dashboard)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Wearemarz (from API credentials)
WEAREMARZ_API_KEY=marz_XxxxxxxxxxxxxxxxxX
WEAREMARZ_API_SECRET=eNKmvTVHMP5bFYMSk...

# Optional: For email service integration
# SENDGRID_API_KEY=SG...
# SMTP_HOST=smtp.gmail.com
# SMTP_USER=your-email@gmail.com
# SMTP_PASSWORD=your-password
```

## Post-Deployment Tasks

### 1. Verify Database Connection
```bash
curl https://your-domain.com/api/auth/check-session
# Should return: {"authenticated": false}
```

### 2. Test Admin Login
1. Go to `https://your-domain.com/admin/login`
2. Use credentials: barbarakatusabe999@gmail.com / QWer12@*
3. Verify dashboard loads

### 3. Seed Data
```bash
# Add sample products for testing
NEXT_PUBLIC_SUPABASE_URL=your_url SUPABASE_SERVICE_ROLE_KEY=your_key node scripts/seed-products.js
```

### 4. Configure Domain
1. Go to Vercel project settings
2. Add your custom domain
3. Update Supabase OAuth callbacks if using Supabase Auth later

### 5. Set Up SSL/HTTPS
- Vercel automatically provides SSL certificates
- Ensure your domain DNS is pointing to Vercel

### 6. Configure Webhooks
Update payment webhook URL in Wearemarz dashboard:
```
https://your-domain.com/api/webhooks/payment
```

### 7. Test Payment Flow
1. Browse products on production site
2. Add items to cart
3. Complete checkout with test payment
4. Verify order in admin dashboard

## Monitoring & Logging

### Vercel Analytics
- Dashboard automatically available at vercel.com/dashboard
- Monitor build times, deployment history, usage

### Application Logging
```bash
# View logs in Vercel dashboard
vercel logs

# Or locally for debugging
npm run dev
```

### Database Monitoring
- Supabase dashboard shows real-time stats
- Monitor query performance and usage

## Performance Optimization

### Image Optimization
- Images are automatically optimized by Next.js
- Consider using Image component for better performance:
```tsx
import Image from 'next/image';
<Image src="/logo.png" alt="Logo" width={100} height={100} />
```

### Database Optimization
Already configured:
- Indices on frequently queried columns
- Proper foreign key relationships
- Efficient table structure

### Caching Strategy
- Static pages cached by Vercel Edge Network
- Database queries cached where appropriate

## Scaling Recommendations

### When Traffic Increases
1. **Database**: Upgrade Supabase plan
2. **Storage**: Consider Vercel Blob for images
3. **Email**: Implement SendGrid or AWS SES
4. **Analytics**: Monitor Meta Pixel and Google Ads data

### Content Delivery
- Vercel Edge Functions for low-latency responses
- Geographic distribution automatic

## Security Checklist for Production

- [ ] Environment variables are not in code
- [ ] HTTPS enforced
- [ ] Admin password is strong
- [ ] Payment API credentials are secure
- [ ] Database backups enabled
- [ ] Access logs monitored
- [ ] Rate limiting configured
- [ ] Input validation on all forms
- [ ] CORS properly configured
- [ ] Security headers configured

## Troubleshooting Deployment Issues

### Build Fails
```bash
# Clear cache and rebuild
vercel deploy --prod --force
```

### Database Connection Error
1. Verify NEXT_PUBLIC_SUPABASE_URL is correct
2. Check SUPABASE_SERVICE_ROLE_KEY is valid
3. Ensure database tables exist in Supabase

### Payment Not Working
1. Verify WEAREMARZ_API_KEY and SECRET in env vars
2. Check Wearemarz API status page
3. Ensure webhook URL is correctly configured

### Images Not Displaying
1. Verify `/public/products/` folder exists
2. Check file permissions
3. Ensure image paths are correct in database

## Rollback Procedure

### Using Vercel Deployments Tab
1. Go to Deployments in Vercel dashboard
2. Find the previous working deployment
3. Click "Promote to Production"

### Using Git
```bash
git revert <commit-hash>
git push
# Vercel will automatically redeploy
```

## Maintenance & Updates

### Regular Tasks
- Monitor error logs weekly
- Check database performance monthly
- Update dependencies quarterly
- Review security patches

### Backup Strategy
- Automatic Supabase backups (available with paid plan)
- Manual backups: `supabase db pull > backup.sql`
- Store backups securely

## Support & Escalation

### Issues Contact
- **Email**: barbarakatusabe999@gmail.com
- **WhatsApp**: +256753979539

### Resources
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Wearemarz API Docs](https://wallet.wearemarz.com/)

---

**Deployment Status**: Ready for production

**Estimated Deployment Time**: 5-10 minutes on Vercel
