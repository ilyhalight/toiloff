// https://nuxt.com/docs/api/configuration/nuxt-config
import config from "./config/config.js";

export default defineNuxtConfig({
  modules: [
    "@nuxt/devtools",
    "@nuxtjs/i18n",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "nuxt-icon",
    "nuxt-icons",
    "@nuxtjs/seo",
  ],

  css: [
    "~/assets/styles/main.scss",
    "vue-final-modal/style.css",
    "vue-toastification/dist/index.css",
  ],

  colorMode: {
    preference: "system",
    fallback: "dark",
  },

  seo: {
    meta: {
      themeColor: [
        { content: "#05010d", media: "(prefers-color-scheme: dark)" },
        { content: "#ffffff", media: "(prefers-color-scheme: light)" },
      ],
    },
  },

  i18n: {
    vueI18n: "./i18n.config.ts",
    strategy: "no_prefix",
    baseUrl: config.baseUrl,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
    locales: [
      {
        code: "ru",
        language: "ru-RU",
        name: "Русский",
        emoji: "twemoji:flag-russia",
        file: "ru.yml",
      },
      {
        code: "en",
        language: "en-US",
        name: "English",
        emoji: "twemoji:flag-united-states",
        file: "en-US.yml",
      },
    ], // used in URL path prefix
    defaultLocale: "en",
    lazy: true,
  },

  site: {
    url: config.baseUrl,
    name: config.siteName,
    description: config.siteDesc,
  },

  sitemap: {
    urls: [
      {
        loc: "/",
        lastmod: "2025-04-03",
      },
      {
        loc: "/social",
        lastmod: "2025-04-03",
      },
      {
        loc: "/about",
        lastmod: "2025-04-03",
      },
      {
        loc: "/donate",
        lastmod: "2025-04-03",
      },
    ],
  },

  image: {
    quality: 80,
    format: ["avif", "webp", "png"],
  },

  robots: {
    allow: [],
    disallow: [],
  },

  schemaOrg: {
    host: config.baseUrl,
  },

  ogImage: {
    defaults: {
      component: "NuxtSeo",
    },
    fonts: [
      // will load this font from Google fonts
      "Roboto:400",
    ],
  },

  runtimeConfig: {
    public: {
      siteUrl: config.baseUrl,
    },
  },

  app: {
    head: {
      // titleTemplate: '%pageTitle %titleSeparator %siteName',
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "keywords",
          content:
            "toiloff, toil, toildev, developer, dev, coder, personal, website, toil site, тоил, сайт, t01l, t0il, to1l, toilofficial, toil.official",
        },
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
        },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      ],
    },
  },

  debug: false,
  compatibilityDate: "2025-04-03",
});
