# Zustand Documentation & Tutorial Website

A comprehensive documentation and tutorial website for the Zustand state management library, built with Next.js 15, TypeScript, and Tailwind CSS. This site is optimized for SEO and includes Google Analytics integration to support monetization through advertising.

## 🌟 Features

- **Multi-language Support**: Available in English (en), Chinese (zh), and Japanese (ja)
- **SEO Optimized**: 
  - Server-side rendering with Next.js App Router
  - Structured metadata and Open Graph tags
  - XML sitemap generation
  - robots.txt configuration
  - Semantic HTML structure
- **Google Analytics**: Integrated with Google Tag Manager (GTM) for analytics and ad tracking
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Complete Documentation**: 
  - Getting Started guide
  - Core Concepts
  - Advanced Topics
  - API Reference
  - Interactive Examples
  - Step-by-step Tutorials
- **Fast Performance**: Optimized with Next.js static generation and automatic code splitting

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/iamsail/zustandSite.git
cd zustandSite
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your configuration:
```bash
cp .env.example .env.local
```

4. Update the `.env.local` file with your Google Tag Manager ID:
```
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## 📁 Project Structure

```
zustand-site/
├── app/                      # Next.js App Router
│   ├── [locale]/            # Internationalized routes
│   │   ├── page.tsx         # Home page
│   │   ├── docs/            # Documentation pages
│   │   ├── tutorial/        # Tutorial pages
│   │   ├── examples/        # Example pages
│   │   ├── api/             # API reference
│   │   └── layout.tsx       # Locale-specific layout
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Global styles
│   ├── sitemap.ts           # Sitemap generation
│   └── robots.ts            # Robots.txt generation
├── components/              # React components
│   ├── Header.tsx          # Navigation header
│   └── Footer.tsx          # Site footer
├── lib/                    # Utility functions
│   ├── gtm.ts             # Google Tag Manager utilities
│   └── seo-config.ts      # SEO configuration
├── messages/              # i18n translations
│   ├── en.json           # English translations
│   ├── zh.json           # Chinese translations
│   └── ja.json           # Japanese translations
├── public/               # Static files
├── i18n.ts              # i18n configuration
├── middleware.ts        # Next.js middleware for i18n
└── next.config.js       # Next.js configuration
```

## 🌐 Multi-language Support

The site supports three languages:
- English (en) - Default
- Chinese (zh)
- Japanese (ja)

All routes are prefixed with the locale code:
- `/en` - English
- `/zh` - Chinese  
- `/ja` - Japanese

To add a new language:
1. Add the locale to `middleware.ts`
2. Create a new translation file in `messages/[locale].json`
3. Update the language selector in `components/Header.tsx`

## 📊 SEO Configuration

### Google Tag Manager

1. Sign up for Google Tag Manager at https://tagmanager.google.com/
2. Create a new container for your website
3. Copy your GTM ID (format: GTM-XXXXXXX)
4. Add it to your `.env.local` file
5. Set up Google Analytics in GTM dashboard

### Metadata

The site includes comprehensive metadata for SEO:
- Title tags with templates
- Meta descriptions
- Keywords
- Open Graph tags for social media
- Twitter Card tags
- Canonical URLs
- Language alternates

### Sitemap

The sitemap is automatically generated at `/sitemap.xml` and includes:
- All pages in all supported languages
- Last modified dates
- Change frequencies
- Priorities
- Language alternates

## 🎨 Customization

### Styling

The site uses Tailwind CSS. To customize the theme:
- Edit `tailwind.config.ts` to change colors, fonts, etc.
- Modify `app/globals.css` for global styles

### Content

To update content:
- Edit translation files in `messages/` for text content
- Modify page components in `app/[locale]/` for structure and layout

### Domain Configuration

Before deploying, update the domain in:
- `.env.local` - NEXT_PUBLIC_SITE_URL
- `lib/seo-config.ts` - canonical URLs and Open Graph settings
- `app/sitemap.ts` - base URL
- `app/robots.ts` - sitemap URL

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables
4. Deploy

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Google Cloud Platform
- Self-hosted with Node.js

## 📝 License

ISC

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue on GitHub.