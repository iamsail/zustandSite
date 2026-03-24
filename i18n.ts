import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale = 'en' }) => ({
  locale,
  messages: (await import(`./messages/${locale}.json`)).default,
  onError(error) {
    // Suppress MISSING_MESSAGE errors; pages with missing translations
    // will show the key path as a placeholder instead of crashing the build.
    if (error.code !== 'MISSING_MESSAGE') {
      console.error(error);
    }
  },
  getMessageFallback({ namespace, key }) {
    return `${namespace}.${key}`;
  }
}));
