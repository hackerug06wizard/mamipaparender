# Deploy to Render - Step by Step (With Screenshots)

This guide walks you through deploying Mami Papa Babies to Render with detailed explanations.

---

## Table of Contents

1. [Prepare Your Code](#step-1-prepare-your-code)
2. [Create GitHub Repository](#step-2-create-github-repository)
3. [Sign Up for Render](#step-3-sign-up-for-render)
4. [Create Web Service](#step-4-create-web-service)
5. [Configure Settings](#step-5-configure-settings)
6. [Deploy](#step-6-deploy)
7. [Test Your Site](#step-7-test-your-site)
8. [Add Custom Domain](#step-8-add-custom-domain)
9. [Troubleshooting](#troubleshooting)

---

## Step 1: Prepare Your Code

### 1.1 Ensure .gitignore is Updated

Your `.gitignore` file should be properly configured. It's already set up in the project.

### 1.2 Check Your Code is Ready

```bash
# Make sure everything is committed
git status

# Should show: "nothing to commit, working tree clean"
```

### 1.3 Collect Your API Keys

Have these ready before starting:

```
From Supabase:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

From Wearemarz:
- WEAREMARZ_API_KEY = marz_ZfdKIQYeolMHgoN
- WEAREMARZ_API_SECRET = eNKmvTVHMP5bFYMSk.Jpryn8xDhcIEJO
```

---

## Step 2: Create GitHub Repository

### 2.1 Initialize Git (if not done)

```bash
cd /path/to/mami-papa-babies
git init
```

### 2.2 Add Remote

```bash
git remote add origin https://github.com/YOUR_USERNAME/mami-papa-babies.git
```

### 2.3 Commit and Push

```bash
# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Mami Papa Babies E-commerce Platform"

# Push to GitHub (create main branch if needed)
git branch -M main
git push -u origin main
```

### 2.4 Verify on GitHub

1. Go to https://github.com/YOUR_USERNAME/mami-papa-babies
2. You should see all your files uploaded
3. ✅ If you see the files, you're ready!

---

## Step 3: Sign Up for Render

### 3.1 Visit Render

Go to https://render.com

### 3.2 Click "Get Started"

**What you see:**
```
┌─────────────────────────────────────┐
│         Welcome to Render           │
│                                     │
│     [Get Started] [Sign In]         │
└─────────────────────────────────────┘
```

### 3.3 Sign Up with GitHub (Recommended)

1. Click "Sign up with GitHub"
2. You'll be redirected to GitHub
3. Click "Authorize render" button
4. GitHub will ask for permission
5. Click "Authorize"

### 3.4 Complete Registration

1. You'll return to Render
2. Fill in your account details
3. Verify your email
4. ✅ You're now signed up!

---

## Step 4: Create Web Service

### 4.1 Access Dashboard

After signing up, you'll see the Render dashboard:

```
┌──────────────────────────────────────┐
│  Your Services                       │
│  [+ New Web Service]                 │
│  [+ New Static Site]                 │
│  [+ New Database]                    │
└──────────────────────────────────────┘
```

### 4.2 Create New Service

Click the **"+ New"** button, then select **"Web Service"**

### 4.3 Connect GitHub Repository

**What you'll see:**
1. A list of your GitHub repositories
2. Search box to find `mami-papa-babies`
3. Your repository in the list

**What to do:**
1. Type "mami-papa-babies" in search
2. Click your repository when it appears
3. Click "Connect"

**Render will ask for permissions:**
- Click "Install" to allow Render to access your repo
- Authorize the connection

### 4.4 Select Branch

**What you'll see:**
```
Which branch to deploy? [main ▼]
```

Keep it as `main` (already selected)

---

## Step 5: Configure Settings

### 5.1 Basic Configuration

Fill in these fields:

| Field | Value |
|-------|-------|
| Name | `mami-papa-babies` |
| Environment | `Node` |
| Region | `Ohio` (or nearest to you) |
| Branch | `main` |
| Root Directory | `.` (leave empty/default) |

### 5.2 Build & Start Commands

```
Build Command: npm install && npm run build

Start Command: npm start
```

**What these do:**
- **Build Command**: Installs dependencies and prepares your app
- **Start Command**: Starts the server when deployed

### 5.3 Environment Variables

Click **"Add Environment Variable"** for each:

#### Variable 1: Supabase URL
```
Key:   NEXT_PUBLIC_SUPABASE_URL
Value: https://xxxxx.supabase.co
```
*Replace with your actual Supabase URL*

#### Variable 2: Supabase Key
```
Key:   NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGc...
```
*Replace with your actual Supabase anon key*

#### Variable 3: Wearemarz API Key
```
Key:   WEAREMARZ_API_KEY
Value: marz_ZfdKIQYeolMHgoN
```

#### Variable 4: Wearemarz API Secret
```
Key:   WEAREMARZ_API_SECRET
Value: eNKmvTVHMP5bFYMSk.Jpryn8xDhcIEJO
```

#### Variable 5: Node Environment
```
Key:   NODE_ENV
Value: production
```

### 5.4 Advanced Settings

Scroll down to find:

```
✓ Auto-Deploy: Yes (enabled)
```

This means every time you push to GitHub, it automatically deploys.

---

## Step 6: Deploy

### 6.1 Final Review

Before clicking Deploy, verify:
- ✅ Repository: mami-papa-babies
- ✅ Branch: main
- ✅ Build Command: npm install && npm run build
- ✅ Start Command: npm start
- ✅ All 5 environment variables added
- ✅ Auto-Deploy: Enabled

### 6.2 Click Deploy

Scroll to the bottom and click the blue **"Create Web Service"** button.

**What happens:**
1. Render creates your service
2. Starts building your app
3. Shows real-time build logs
4. Should take 2-5 minutes

### 6.3 Watch Deployment Logs

You'll see:
```
Cloning repository...
Installing dependencies...
Building Next.js app...
Generating static files...
Starting server...
Service live at: https://mami-papa-babies.onrender.com
```

### 6.4 Deployment Complete

When you see:
```
✓ Your service is live
```

You're done! Your site is live at the URL shown.

---

## Step 7: Test Your Site

### 7.1 Visit Your Live Site

Click the URL shown (e.g., `https://mami-papa-babies.onrender.com`)

### 7.2 Test Key Features

- [ ] **Homepage loads** - See welcome message
- [ ] **Categories display** - See category buttons
- [ ] **Add products to cart** - Click product → Add to Cart
- [ ] **Checkout works** - Go through entire checkout
- [ ] **Admin login** - Visit `/admin/login`
  - Email: `barbarakatusabe999@gmail.com`
  - Password: `QWer12@*`
- [ ] **WhatsApp button** - Complete a purchase, see WhatsApp button
- [ ] **Logo displays** - See Mami Papa Babies logo at top

### 7.3 If Something Doesn't Work

1. Go to Render dashboard
2. Click your service
3. Go to **"Logs"** tab
4. Look for error messages
5. Check **Troubleshooting** section below

---

## Step 8: Add Custom Domain (Optional)

If you have a domain like `mamipapababies.com`

### 8.1 Go to Service Settings

1. In Render dashboard
2. Click your service
3. Go to **"Settings"** tab

### 8.2 Add Custom Domain

1. Find **"Custom Domain"** section
2. Click "Add Custom Domain"
3. Enter your domain (e.g., `mamipapababies.com`)
4. Click "Add"

### 8.3 Configure DNS

Render will show you a CNAME record:

```
CNAME: your-service.onrender.com
```

1. Go to your domain provider (GoDaddy, Namecheap, etc.)
2. Find DNS settings
3. Add CNAME record pointing to Render's URL
4. Wait 24 hours for DNS to propagate

### 8.4 Test Custom Domain

After 24 hours, visit your domain:
```
https://mamipapababies.com
```

---

## Troubleshooting

### Issue: "Build Failed"

**Symptoms:** Red error message during deployment

**Solution:**
1. Check the build logs for specific error
2. Common causes:
   - Missing dependency in package.json
   - Wrong environment variable
   - Syntax error in code

**Fix:**
1. Fix the issue locally
2. Commit: `git commit -m "Fix build error"`
3. Push: `git push origin main`
4. Render automatically redeploys

---

### Issue: "Cannot Connect to Database"

**Symptoms:** 500 error or blank page

**Solution:**
1. Verify environment variables are correct
2. Check Supabase project is active
3. Ensure database tables exist

**Steps:**
1. Go to Render dashboard
2. Click service → Settings
3. Check environment variables
4. Go to Supabase dashboard
5. Verify database URL and key
6. Update in Render if needed
7. Render auto-redeploys

---

### Issue: "Deployment Stuck"

**Symptoms:** Says "Deploying" for more than 10 minutes

**Solution:**
1. Go to Render dashboard
2. Click service
3. Click "Cancel" button if available
4. Wait 5 minutes
5. Redeploy manually:
   - Push new commit to GitHub
   - Or click "Manual Deploy" button

---

### Issue: "Environment Variables Not Working"

**Symptoms:** App works locally but not on Render

**Solution:**
1. Check variable names exactly match
2. For public variables, use `NEXT_PUBLIC_` prefix
3. No extra spaces in values
4. Verify values are correct

**Example wrong:**
```
WEAREMARZ_API_KEY = marz_ZfdKIQYeolMHgoN  (extra space!)
```

**Example correct:**
```
WEAREMARZ_API_KEY=marz_ZfdKIQYeolMHgoN  (no space)
```

---

### Issue: "WhatsApp Button Not Showing"

**Symptoms:** WhatsApp button doesn't appear after purchase

**Solution:**
1. Complete a test purchase first
2. Button appears on order success page
3. Check browser console (F12) for JavaScript errors
4. Check Render logs for backend errors

---

### Issue: "Admin Login Not Working"

**Symptoms:** Can't log in to `/admin/login`

**Solution:**
1. Check credentials:
   - Email: `barbarakatusabe999@gmail.com`
   - Password: `QWer12@*`
2. Verify database connection
3. Check Render logs for auth errors

---

## Monitoring Your Site

### Check Logs

1. Render Dashboard
2. Click your service
3. Go to **"Logs"** tab
4. See real-time logs

### Common Log Messages

```
[OK]      Service started successfully
[ERROR]   Database connection failed (needs fixing)
[WARNING] High memory usage (upgrade plan)
[INFO]    New deployment initiated
```

### Restart Service

If something hangs:
1. Render Dashboard
2. Click service
3. Click **"Restart"** button (top right)
4. Service restarts in 30 seconds

---

## Next Steps

### Immediately After Deployment

1. ✅ Test all features
2. ✅ Add sample products in admin
3. ✅ Make a test purchase
4. ✅ Verify emails are sent
5. ✅ Test WhatsApp button

### Within a Week

1. 📊 Monitor performance
2. 📧 Set up email notifications
3. 🔔 Configure alerts
4. 📱 Test on mobile
5. 💳 Process real payments

### Ongoing

1. 🔄 Deploy updates via GitHub pushes
2. 📈 Monitor user activity
3. 🛡️ Check security logs
4. 💾 Regular backups
5. 📚 Update documentation

---

## Key Commands Reference

### Update Your Site

```bash
# Make changes
# Edit files locally

# Commit
git add .
git commit -m "Update: Add new features"

# Push (auto-deploys to Render!)
git push origin main

# Check deployment status
# Go to Render dashboard
```

### View Logs

1. Render Dashboard
2. Your service
3. Logs tab

### Stop Service

1. Render Dashboard
2. Your service
3. Settings → Danger Zone → Delete

---

## Quick Reference Card

```
Render Service Name:    mami-papa-babies
Region:                 Ohio
Plan:                   Free (upgrade anytime)
Environment:            Node
Build Command:          npm install && npm run build
Start Command:          npm start
Auto-Deploy:            Enabled

Admin Credentials:
- Email:               barbarakatusabe999@gmail.com
- Password:            QWer12@*

Key URLs:
- Live Site:           https://mami-papa-babies.onrender.com
- Admin:               https://mami-papa-babies.onrender.com/admin/login
- Cart:                https://mami-papa-babies.onrender.com/cart
- Render Dashboard:    https://dashboard.render.com
```

---

## Congratulations! 🎉

You've successfully deployed Mami Papa Babies to Render!

**Your site is live and ready for customers.**

### Next:
1. Add your first products
2. Customize with your content
3. Start marketing
4. Process orders
5. Grow your business!

For questions, check the main RENDER_DEPLOYMENT.md or contact Render support.
