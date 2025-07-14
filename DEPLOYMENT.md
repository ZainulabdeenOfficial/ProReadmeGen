# 🚀 Deployment Guide - Vercel

This guide will walk you through deploying the GitHub README Generator to Vercel with optimal configuration.

## 📋 Prerequisites

- GitHub account
- Vercel account (free tier available)
- GitHub Personal Access Token (optional but recommended)

## 🔧 Step 1: Prepare Your Repository

### 1. Fork or Clone the Repository
```bash
git clone https://github.com/yourusername/github-readme-generator.git
cd github-readme-generator
```

### 2. Test Locally (Optional)
```bash
npm install
npm run dev
```
Visit `http://localhost:3000` to ensure everything works.

## 🌐 Step 2: Deploy to Vercel

### Option A: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/github-readme-generator)

### Option B: Manual Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Next.js project

3. **Configure Build Settings** (Auto-detected)
   - Framework Preset: `Next.js`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

## 🔑 Step 3: Environment Variables (Optional but Recommended)

### Why You Need a GitHub Token
- **Higher Rate Limits**: 5000 requests/hour instead of 60
- **Better Performance**: Faster data fetching
- **Reliability**: Avoid rate limiting issues

### Getting a GitHub Token

1. **Go to GitHub Settings**
   - Visit: https://github.com/settings/personal-access-tokens/tokens
   - Click "Generate new token"

2. **Configure Token**
   - **Expiration**: Choose your preference (90 days recommended)
   - **Scopes**: Select `public_repo` only
   - **Note**: "README Generator API Access"

3. **Copy the Token**
   - ⚠️ Save it immediately - you won't see it again!

### Adding to Vercel

1. **Go to Project Settings**
   - In your Vercel dashboard, select your project
   - Go to "Settings" → "Environment Variables"

2. **Add Environment Variable**
   ```
   Name: GITHUB_TOKEN
   Value: your_github_personal_access_token_here
   Environment: Production, Preview, Development
   ```

3. **Redeploy**
   - Go to "Deployments" tab
   - Click "..." on latest deployment
   - Select "Redeploy"

## ⚡ Step 4: Performance Optimization

### Vercel Configuration (Already Included)
The project includes optimized `vercel.json` settings:

- **Function Duration**: 30 seconds max
- **Security Headers**: XSS protection, content type options
- **CORS Headers**: API access configuration
- **Redirects**: SEO-friendly URL handling

### Performance Features
- **Edge Caching**: Static assets cached globally
- **Image Optimization**: Automatic image compression
- **Code Splitting**: Smaller bundle sizes
- **Gzip Compression**: Faster load times

## 🔍 Step 5: Testing Your Deployment

### 1. Basic Functionality Test
- Visit your Vercel URL
- Enter a GitHub username (try: `octocat`, `torvalds`)
- Verify README generation works
- Test copy/download functionality

### 2. Performance Check
- Use Vercel Analytics (if enabled)
- Check loading speeds with browser dev tools
- Test on mobile devices

### 3. API Rate Limiting
- Test without GitHub token (60 requests/hour limit)
- Test with GitHub token (5000 requests/hour limit)
- Monitor usage in GitHub token settings

## 🎯 Step 6: Custom Domain (Optional)

### 1. Add Domain in Vercel
- Go to Project Settings → "Domains"
- Add your custom domain
- Follow DNS configuration instructions

### 2. SSL Certificate
- Vercel automatically provides SSL certificates
- Your site will be available at `https://yourdomain.com`

## 📊 Step 7: Monitoring & Analytics

### Vercel Analytics
```bash
# Install Vercel Analytics (optional)
npm install @vercel/analytics
```

### Error Monitoring
- Check Vercel Functions logs
- Monitor build logs for issues
- Set up notifications for deployment failures

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check build logs in Vercel dashboard
   # Common causes: TypeScript errors, dependency issues
   npm run build  # Test locally first
   ```

2. **API Rate Limiting**
   ```
   Error: API rate limit exceeded
   Solution: Add GITHUB_TOKEN environment variable
   ```

3. **Environment Variables Not Working**
   - Ensure variable is added to all environments
   - Redeploy after adding variables
   - Check variable names (case-sensitive)

4. **GitHub API Issues**
   ```
   Error: User not found
   Solution: Verify username exists and profile is public
   ```

### Debug Mode
Enable verbose logging by adding to `vercel.json`:
```json
{
  "build": {
    "env": {
      "NEXT_TELEMETRY_DISABLED": "1",
      "DEBUG": "1"
    }
  }
}
```

## 🚀 Production Checklist

- [ ] Repository pushed to GitHub
- [ ] Vercel deployment successful
- [ ] Environment variables configured
- [ ] GitHub token added (optional)
- [ ] Basic functionality tested
- [ ] Mobile responsiveness verified
- [ ] Performance metrics checked
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Analytics set up (optional)

## 🔄 Updates & Maintenance

### Updating the Application
```bash
git pull origin main
git add .
git commit -m "Update application"
git push origin main
# Vercel will automatically redeploy
```

### Monitoring
- Regular check on GitHub API usage
- Monitor Vercel function execution times
- Check for dependency updates
- Review performance metrics

---

## 🎉 Congratulations!

Your GitHub README Generator is now live and ready to create amazing profile READMEs!

**Next Steps:**
- Share your deployment with the community
- Contribute improvements back to the project
- Create awesome READMEs for yourself and others

**Need Help?**
- Check the [main README](README.md) for features and usage
- Open an issue on GitHub for bugs or feature requests
- Join our community discussions 