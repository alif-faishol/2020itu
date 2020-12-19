import NextI18Next from 'next-i18next';
import nextConfig from 'next/config';
import path from 'path';

const { localeSubpaths } = nextConfig().publicRuntimeConfig;

const i18n = new NextI18Next({
  defaultLanguage: 'id',
  otherLanguages: ['en'],
  localeSubpaths,
  localePath: path.resolve('./public/static/locales'),
});

export default i18n;
