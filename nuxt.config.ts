// https://nuxt.com/docs/api/configuration/nuxt-config
import fs from 'fs';
import config from './config/config.js';


export default defineNuxtConfig({
  modules: [
    '@nuxt/devtools',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@nuxt/image-edge',
    'nuxt-icon',
    'nuxt-icons',
    'nuxt-simple-sitemap',
    'nuxt-simple-robots',
    'nuxt-schema-org',
    'nuxt-og-image'
  ],
  css: [
    '~/assets/styles/main.scss',
    'vue-final-modal/style.css',
    'vue-toastification/dist/index.css'
  ],
  devtools: {
    enabled: false
  },
  i18n: {
    dynamicRouteParams: true,
    strategy: 'no_prefix',
    baseUrl: config.baseUrl,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    locales: [
      {
        code: 'ru',
        iso: 'ru-RU',
        name: 'Русский',
        emoji: 'twemoji:flag-russia',
        file: 'ru.yml'
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        emoji: 'twemoji:flag-united-states',
        file: 'en-US.yml'
      }
    ], // used in URL path prefix
    defaultLocale: 'ru',   // default locale of your project for Nuxt pages and routings
    langDir: 'locales',
    lazy: true,
  },
  site: {
    url: config.baseUrl,
  },
  sitemap: {
    enabled: true
  },
  robots: {
    enabled: true,
    allow: [],
    disallow: []
  },
  schemaOrg: {
    host: config.baseUrl,
  },
  ogImage: {
    fonts: [
      // will load this font from Google fonts
      'Roboto:400'
    ]
  },
  runtimeConfig: {
    public: {
      siteUrl: config.baseUrl,
    }
  },
  // runtimeConfig: {
  //   indexable: config.siteIndexable,
  //   public: {
  //     siteUrl: config.baseUrl,
  //     siteName: config.siteName,
  //     siteDescription: config.siteDesc,
  //     language: 'ru', // prefer more explicit language codes like `en-AU` over `en`
  //     titleSeparator: config.titleSeparator
  //   }
  // },

  app: {
      head: {
          // titleTemplate: '%pageTitle %titleSeparator %siteName',
          meta: [
              { charset: 'utf-8' },
              { name: 'viewport', content: 'width=device-width, initial-scale=1' },
              { name: 'keywords', content: 'toiloff, toil, toildev, developer, dev, coder, personal, website, toil site, тоил, сайт, t01l, t0il, to1l, toilofficial, toil.official' },
          ],
          link: [
              { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
              { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
              { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'},
              { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
          ]
      }
  },
  // vite: {
      // server: {
      //     https: {
      //         key: fs.readFileSync('/etc/letsencrypt/live/toiloff.ru/privkey.pem'),
      //         cert: fs.readFileSync('/etc/letsencrypt/live/toiloff.ru/fullchain.pem'),
      //     },
      //     hmr: {
      //         protocol: 'wss',
      //     }
      // }
  // },
  debug: false,
})
