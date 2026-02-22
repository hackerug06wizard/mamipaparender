# Deploy Now: Mami Papa Babies

Choose your deployment method below. All are easy and free to get started!

---

## 🚀 Option 1: Deploy to Render (RECOMMENDED)

Render is the easiest option. Deploy in 3 minutes!

### Quick Start

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready to deploy"
   git push origin main
   ```

2. **Go to Render**
   - Visit https://render.com
   - Sign up with GitHub
   - Click "New Web Service"
   - Select your repo
   - Follow the form

3. **Set Environment Variables**
   ```
   NEXT_PUBLIC_SUPABASE_URL = your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_anon_key
   WEAREMARZ_API_KEY = marz_ZfdKIQYeolMHgoN
   WEAREMARZ_API_SECRET = eNKmvTVHMP5bFYMSk.Jpryn8xDhcIEJO
   NODE_ENV = production
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait 2-5 minutes
   - Your site is live!

### Full Guide
See **RENDER_DEPLOYMENT.md** for detailed instructions

---

## 🎮 Option 2: Deploy to Vercel

Vercel is optimized for Next.js (made by the same team).

### Quick Steps

1. Go to https://vercel.com/new
2. Import your GitHub repo
3. Add environment variables
4. Click Deploy
5. Done!

### Full Guide
See **DEPLOYMENT.md** for detailed instructions

---

## 🖥️ Option 3: Deploy Manually (Linux Server)

For self-hosted on your own server.

### Requirements
- Linux server (Ubuntu 20.04+)
- Node.js 18+
- PostgreSQL (or use Supabase)
- Nginx (optional, for reverse proxy)

### Quick Steps

```bash
# SSH into your server
ssh user@your-server.com

# Clone your repo
git clone https://github.com/YOUR_USERNAME/mami-papa-babies.git
cd mami-papa-babies

# Install dependencies
npm install

# Create .env file
nano .env

# Build
npm run build

# Start
npm start
```

### Full Guide
See **MANUAL_DEPLOYMENT.md** for detailed instructions

---

## 📋 Comparison

| Feature | Render | Vercel | Manual |
|---------|--------|--------|--------|
| **Ease** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| **Cost** | Free tier | Free tier | $5-50/mo |
| **Setup Time** | 3 min | 3 min | 30 min |
| **Auto-deploy** | ✅ | ✅ | ❌ |
| **Monitoring** | ✅ | ✅ | ❌ |
| **Support** | Good | Excellent | Self |

---

## 🔑 Environment Variables

You'll need these for any deployment:

```bash
# From Supabase project settings
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# From Wearemarz API (provided)
WEAREMARZ_API_KEY=marz_ZfdKIQYeolMHgoN
WEAREMARZ_API_SECRET=eNKmvTVHMP5bFYMSk.Jpryn8xDhcIEJO

# For production
NODE_ENV=production
```

---

## ✅ Deployment Checklist

Before deploying:

- [ ] All code committed to GitHub
- [ ] Environment variables collected
- [ ] Supabase database set up
- [ ] Categories seeded
- [ ] Admin user created
- [ ] Admin credentials ready
- [ ] Domain name ready (optional)

---

## 🧪 Test After Deployment

Once live, test:

1. ✅ Homepage loads
2. ✅ Categories display
3. ✅ Products load
4. ✅ Add to cart works
5. ✅ Checkout works
6. ✅ Admin login works (`/admin/login`)
7. ✅ WhatsApp button appears
8. ✅ Email notifications send

---

## 🆘 Issues?

### Deployment Failed
- Check the build logs
- Verify environment variables are set
- Ensure all dependencies are in package.json
- Check Node version (must be 16+)

### Site Not Loading
- Wait 2-5 minutes after deployment
- Clear browser cache
- Check if custom domain DNS is configured
- Look at application logs

### Database Connection Error
- Verify Supabase credentials
- Check Supabase project is active
- Confirm database tables exist
- Look for connection errors in logs

---

## 📚 Full Documentation

- **RENDER_DEPLOYMENT.md** - Complete Render guide
- **DEPLOYMENT.md** - Vercel deployment
- **MANUAL_DEPLOYMENT.md** - Self-hosted guide
- **README.md** - Project overview
- **LATEST_UPDATES.md** - What's new

---

## 🎯 Next Steps

1. **Choose a deployment method above**
2. **Follow the quick steps**
3. **Add your environment variables**
4. **Test your live site**
5. **Add your products in admin**
6. **Start accepting orders!**

---

## 💡 Pro Tips

- **Auto-Deploy**: Every push to GitHub automatically deploys
- **Rollback**: If something breaks, deploy previous version
- **Monitoring**: Check logs daily for errors
- **Scaling**: Start free, upgrade as you grow
- **Backup**: GitHub is your backup

---

## 🎉 You're Ready!

Your e-commerce platform is production-ready. Choose your deployment method and go live!

**Questions?** Check the full guides or visit the platform's documentation.

**Let's grow your business!** 🚀
