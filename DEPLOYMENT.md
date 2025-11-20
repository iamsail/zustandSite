# Deployment Guide

This guide will help you deploy your Zustand documentation website to production and set up Google Analytics for monetization.

## Prerequisites

- A domain name (for SEO and Google AdSense approval)
- Google Tag Manager account
- Google Analytics 4 (GA4) account
- (Optional) Google AdSense account for monetization

## Step 1: Set Up Google Tag Manager

1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Create a new account and container for your website
3. Note your GTM Container ID (format: GTM-XXXXXXX)
4. Add Google Analytics 4 tag in GTM:
   - Click "Tags" → "New"
   - Choose "Google Analytics: GA4 Configuration"
   - Enter your GA4 Measurement ID
   - Set trigger to "All Pages"
   - Save and publish

## Step 2: Set Up Google Analytics 4

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property
3. Note your Measurement ID (format: G-XXXXXXXXXX)
4. This ID should be added to your GTM configuration (see Step 1)

## Step 3: Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Google Tag Manager ID
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Your domain
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Step 4: Update Domain Configuration

Update these files with your actual domain:

### `lib/seo-config.ts`
```typescript
export const defaultSEO = {
  canonical: 'https://yourdomain.com',
  openGraph: {
    url: 'https://yourdomain.com',
    // ... other config
  },
};
```

### `app/sitemap.ts`
```typescript
const baseUrl = 'https://yourdomain.com';
```

### `app/robots.ts`
```typescript
sitemap: 'https://yourdomain.com/sitemap.xml',
```

### `public/robots.txt`
```
Sitemap: https://yourdomain.com/sitemap.xml
```

## Step 5: Deploy to Vercel (Recommended)

Vercel provides the best experience for Next.js applications:

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/)
3. Click "Import Project"
4. Select your GitHub repository
5. Configure environment variables:
   - `NEXT_PUBLIC_GTM_ID`: Your GTM ID
   - `NEXT_PUBLIC_SITE_URL`: Your domain
6. Click "Deploy"

### Custom Domain on Vercel

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Update your DNS records as instructed
5. Wait for DNS propagation (can take up to 48 hours)

## Step 6: Alternative Deployment Options

### Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://www.netlify.com/)
3. Click "New site from Git"
4. Connect your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Add environment variables in Site Settings → Environment

### Self-Hosted with Node.js

1. Build the project:
```bash
npm run build
```

2. Start the server:
```bash
npm start
```

3. Use a process manager like PM2:
```bash
npm install -g pm2
pm2 start npm --name "zustand-site" -- start
```

4. Set up Nginx as reverse proxy:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Step 7: SEO Optimization After Deployment

### Submit to Search Engines

1. **Google Search Console**
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Add your property
   - Verify ownership
   - Submit your sitemap: `https://yourdomain.com/sitemap.xml`

2. **Bing Webmaster Tools**
   - Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
   - Add your site
   - Submit your sitemap

### Verify SEO Setup

1. Check your sitemap is accessible: `https://yourdomain.com/sitemap.xml`
2. Check robots.txt: `https://yourdomain.com/robots.txt`
3. Test metadata with [Open Graph Debugger](https://developers.facebook.com/tools/debug/)
4. Test structured data with [Google Rich Results Test](https://search.google.com/test/rich-results)

## Step 8: Set Up Google AdSense (For Monetization)

1. Apply for [Google AdSense](https://www.google.com/adsense/)
2. Requirements:
   - Your site must be live for at least 6 months (recommended)
   - Must have quality, original content
   - Must comply with AdSense policies
   - Must have sufficient traffic (varies by region)
3. Once approved, add ad units through Google Tag Manager:
   - Create new tag in GTM
   - Choose "Custom HTML"
   - Add your AdSense code
   - Set appropriate triggers

## Step 9: Monitor Performance

### Google Analytics

- Monitor page views, user engagement, and traffic sources
- Track conversions and user behavior
- Analyze which content performs best

### Google Search Console

- Monitor search performance
- Check for indexing issues
- Review search queries and rankings
- Track click-through rates

### Performance Monitoring

Use tools to monitor site performance:
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

## Step 10: Content Strategy for SEO

To maximize traffic and ad revenue:

1. **Regular Content Updates**
   - Add new tutorials and examples weekly
   - Update existing content with latest Zustand versions
   - Add blog posts about Zustand best practices

2. **Keyword Optimization**
   - Target keywords like "zustand tutorial", "react state management"
   - Use long-tail keywords in documentation
   - Add FAQs and troubleshooting guides

3. **Internal Linking**
   - Link related documentation pages
   - Create a clear content hierarchy
   - Add "Related Topics" sections

4. **External Promotion**
   - Share on social media (Twitter, Reddit, Dev.to)
   - Answer questions on Stack Overflow with links to your docs
   - Write guest posts on tech blogs
   - Create YouTube tutorials linking to your site

## Troubleshooting

### GTM Not Loading

- Check that your GTM ID is correct in `.env.local`
- Verify the script is included in the HTML
- Check browser console for errors
- Ensure your domain is whitelisted in GTM settings

### Pages Not Indexing

- Check robots.txt isn't blocking pages
- Submit sitemap to Search Console
- Verify pages have proper metadata
- Check for crawl errors in Search Console

### Low Performance Scores

- Enable image optimization
- Use Next.js Image component for images
- Minimize JavaScript bundles
- Enable caching headers
- Use CDN for static assets

## Best Practices

1. **Security**
   - Keep dependencies updated: `npm audit fix`
   - Use environment variables for sensitive data
   - Enable HTTPS (automatic on Vercel)

2. **Performance**
   - Use Next.js Image optimization
   - Enable static generation where possible
   - Minimize bundle size
   - Use lazy loading for components

3. **SEO**
   - Unique meta descriptions for each page
   - Proper heading hierarchy (h1, h2, h3)
   - Fast page load times
   - Mobile-friendly design
   - Regular content updates

4. **Monetization**
   - Quality content attracts more visitors
   - More traffic = more ad revenue
   - Focus on user experience
   - Don't overwhelm users with ads
   - Optimize ad placement based on analytics

## Support

For issues or questions:
- Open an issue on GitHub
- Check Next.js documentation: https://nextjs.org/docs
- Check next-intl documentation: https://next-intl-docs.vercel.app/
- Check Zustand documentation: https://github.com/pmndrs/zustand
