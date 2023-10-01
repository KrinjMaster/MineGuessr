import i18n from 'sveltekit-i18n';
import lang from './lang.json';

export const defaultLocale = 'ru';

/** @type {import('sveltekit-i18n').Config} */
const config = ({
  translations: {
    en: { lang },
    ru: { lang },
  },
  loaders: [
    {
      locale: 'en',
      key: 'menu',
      loader: async () => (await import('./en/menu.json')).default,
    },
    {
      locale: 'en',
      key: 'home',
      routes: ['/'],
      loader: async () => (await import('./en/home.json')).default,
    },
    {
      locale: 'en',
      key: 'game',
      loader: async () => (await import('./en/game.json')).default,
    },
    {
      locale: 'ru',
      key: 'menu',
      loader: async () => (await import('./ru/menu.json')).default,
    },
    {
      locale: 'ru',
      key: 'home',
      routes: ['/'],
      loader: async () => (await import('./ru/home.json')).default,
    },
    {
      locale: 'ru',
      key: 'game',
      loader: async () => (await import('./ru/game.json')).default,
    },
  ],
});

export const { t, loading, locales, locale, translations, loadTranslations, addTranslations, setLocale, setRoute } = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading translations...'));