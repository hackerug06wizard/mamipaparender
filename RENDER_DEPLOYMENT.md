# Deploy Mami Papa Babies on Render

This guide will help you deploy your Mami Papa Babies e-commerce platform to Render in just a few minutes.

## What is Render?

Render is a modern cloud platform that makes deploying applications simple and affordable. It supports:
- Free SSL certificates
- Auto-deployment from GitHub
- Automatic scaling
- Easy database management
- Perfect for Next.js applications

## Prerequisites

Before you start, make sure you have:

1. **A GitHub account** - To push your code
2. **A Render account** - Create one at https://render.com (free)
3. **Your Supabase database** - Already set up with your project
4. **API Keys Ready**:
   - Wearemarz API Key
   - Wearemarz API Secret
   - Supabase URL
   - Supabase Anon Key

---

## Step 1: Push Code to GitHub

### 1.1 Create a GitHub Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Mami Papa Babies E-commerce"

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/mami-papa-babies.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 1.2 Update `.gitignore`

Ensure your `.gitignore` file includes:

```
node_modules/
.env
.env.local
.env*.local
dist/
build/
.next/
out/
.DS_Store
*.pem
public/products/*
!public/products/.gitkeep
```

---

## Step 2: Create a Render Account & Project

### 2.1 Sign Up for Render

1. Go to https://render.com
2. Click "Get Started"
3. Sign up with GitHub (recommended for easier deployment)
4. Authorize Render to access your GitHub account

### 2.2 Create a New Web Service

1. In your Render dashboard, click **"New +"** button
2. Select **"Web Service"**
3. Connect your GitHub repository:
   - Search for `mami-papa-babies` (or your repo name)
   - Select it and click "Connect"

---

## Step 3: Configure Deployment Settings

### 3.1 Basic Information

Fill in the following fields:

| Field | Value |
|-------|-------|
| **Name** | `mami-papa-babies` |
| **Region** | `Ohio` (or closest to your users) |
| **Branch** | `main` |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |

### 3.2 Environment Variables

Click **"Add Environment Variable"** and add each of these:

**Database Configuration:**
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Payment API Configuration:**
```
WEAREMARZ_API_KEY=marz_ZfdKIQYeolMHgoN
WEAREMARZ_API_SECRET=eNKmvTVHMP5bFYMSk.Jpryn8xDhcIEJO
```

**Application:**
```
NODE_ENV=production
```

### 3.3 Advanced Settings

1. Scroll down to **"Advanced"**
2. Set **"Auto-Deploy"** to `Yes`
3. Leave other settings as default

---

## Step 4: Deploy

### 4.1 Click Deploy

1. After filling all settings, click the **"Create Web Service"** button at the bottom
2. Render will start building and deploying your application
3. You'll see a deployment log in real-time

### 4.2 Monitor Deployment

The deployment process:
- Installs dependencies
- Builds your Next.js app
- Runs database migrations
- Starts the server

**Expected deployment time:** 2-5 minutes

---

## Step 5: Verify Your Deployment

### 5.1 Get Your Live URL

1. Once deployment completes, you'll see a green checkmark
2. Your live URL will be shown at the top (e.g., `https://mami-papa-babies.onrender.com`)
3. Click the URL to visit your site

### 5.2 Test Key Features

Visit your live site and test:

- ✅ Homepage loads and categories display
- ✅ Click categories to filter products
- ✅ Add products to cart
- ✅ Go through checkout process
- ✅ Admin login page works (`/admin/login`)
- ✅ WhatsApp button appears
- ✅ Logo displays correctly

---

## Step 6: Set Up Custom Domain (Optional)

### 6.1 Add Custom Domain

1. Go to your service settings on Render
2. Click **"Custom Domain"** under "Settings"
3. Enter your domain (e.g., `mamipapababies.com`)
4. Follow the DNS configuration instructions

### 6.2 DNS Configuration

Add the CNAME record provided by Render to your domain provider:

```
CNAME: onrender.com
```

---

## Step 7: Seed Your Database

### 7.1 Admin User

The admin user is already seeded:
- **Email:** `barbarakatusabe999@gmail.com`
- **Password:** `QWer12@*`

### 7.2 Add Products

1. Visit your site's admin: `https://yourdomain.com/admin/login`
2. Log in with above credentials
3. Go to **"Categories"** tab to view default categories
4. Go to **"Products"** tab to add your first products

---

## Environment Variables Reference

### Required Variables

```bash
# Supabase (from your Supabase project settings)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# Wearemarz Payment API (provided)
WEAREMARZ_API_KEY=marz_ZfdKIQYeolMHgoN
WEAREMARZ_API_SECRET=eNKmvTVHMP5bFYMSk.Jpryn8xDhcIEJO

# Environment
NODE_ENV=production
```

### Optional Variables

```bash
# For email notifications (requires email service setup)
EMAIL_SERVICE_API_KEY=your_key

# For advanced analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

---

## Troubleshooting

### Issue: "Build failed"

**Solution:**
1. Check deployment logs for errors
2. Ensure all environment variables are set correctly
3. Verify database migrations ran successfully
4. Check Node version compatibility

### Issue: "White screen after deployment"

**Solution:**
1. Check browser console for errors (F12)
2. Check Render logs: go to service → "Logs"
3. Verify all environment variables are correct
4. Clear browser cache

### Issue: "Cannot connect to database"

**Solution:**
1. Verify Supabase credentials are correct
2. Check Supabase project is active
3. Ensure database tables exist
4. Check Supabase IP whitelist settings

### Issue: "Payment not working"

**Solution:**
1. Verify Wearemarz API credentials
2. Check API endpoint is correct
3. Test in Render logs: go to "Logs" and look for payment errors
4. Ensure webhook URL is set to your Render domain

---

## Monitoring & Maintenance

### View Logs

1. Go to your service on Render
2. Click **"Logs"** tab
3. See real-time application logs
4. Useful for debugging issues

### Auto-Restart

Render automatically restarts your app if it crashes. To manually restart:

1. Go to service dashboard
2. Click **"Restart"** button at top right

### Update Your Site

To deploy updates:

1. Make changes locally
2. Commit: `git commit -m "Update message"`
3. Push: `git push origin main`
4. Render automatically deploys within 1-2 minutes

---

## Cost Estimate

### Render Pricing (as of 2026)

| Component | Cost |
|-----------|------|
| Web Service | $7/month (free tier available) |
| Database (Supabase) | $25/month (or free tier) |
| **Total** | **~$32/month** |

**Note:** First month is often free with promotional credits.

### Save Money

- Use Render's free tier during development
- Scale up only when you get more traffic
- Render offers generous free tier: 750 compute hours/month

---

## Next Steps

### 1. Monitor Performance

- Check Render dashboard for resource usage
- Monitor database performance
- Track application errors

### 2. Set Up Backups

- Supabase: Automatic daily backups included
- Code: GitHub is your backup

### 3. Scale When Needed

- Render scales automatically
- Upgrade plan if you hit limits
- Consider CDN for static assets

### 4. Add Features

Once live, you can add:
- Email service integration
- SMS notifications
- Advanced analytics
- A/B testing
- Inventory management

---

## Support & Resources

### Get Help

- **Render Docs:** https://render.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Supabase Docs:** https://supabase.com/docs
- **Issue in app:** Check Render logs

### Quick Links

- Render Dashboard: https://dashboard.render.com
- Supabase Dashboard: https://supabase.com/dashboard
- GitHub: https://github.com

---

## Deployment Checklist

Before going live:

- [ ] Code pushed to GitHub
- [ ] Render account created
- [ ] Web service created
- [ ] All environment variables set
- [ ] Deployment successful (green checkmark)
- [ ] Site loads at custom URL
- [ ] Admin login works
- [ ] Categories display
- [ ] Products load
- [ ] Cart functionality works
- [ ] Checkout process complete
- [ ] WhatsApp button appears
- [ ] Domain configured (optional)

---

## Advanced: Auto-Deploy Updates

Render automatically deploys whenever you push to GitHub. To set this up:

1. Make changes to your code locally
2. Commit: `git commit -m "Fix button styling"`
3. Push: `git push origin main`
4. Render automatically deploys in 1-2 minutes
5. No manual action needed!

---

## Congratulations! 🎉

Your Mami Papa Babies e-commerce platform is now live!

**Your live URL:** `https://your-domain.onrender.com`

Start processing orders and growing your business!
