// https://nuxt.com/docs/api/configuration/nuxt-config
import fs from 'fs';


export default defineNuxtConfig({
    modules: [
        '@nuxtjs/i18n',
        '@nuxtjs/color-mode',
        '@nuxt/image-edge',
        'nuxt-icon',
    ],
    i18n: {
        dynamicRouteParams: true,
        strategy: 'no_prefix',
        baseUrl: 'https://toiloff.ru',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root',
            // recommended
        },
        locales: [
            {
                code: 'ru',
                iso: 'ru-RU',
                name: 'Русский',
                emoji: '🇷🇺',
                file: 'ru.yml' 
            },
            {
                code: 'en',
                iso: 'en-US',
                name: 'English',
                emoji: '🇬🇧',
                file: 'en-US.yml'
            }
        ], // used in URL path prefix
        defaultLocale: 'ru',   // default locale of your project for Nuxt pages and routings
        langDir: 'locales',
        lazy: true,
        vueI18n: {
            legacy: false,
            locale: 'ru',
        }
    },
    css: [
        '~/assets/styles/main.scss',
        'vue-final-modal/style.css',
        'vue-toastification/dist/index.css'
    ],
    app: {
        head: {
            title: 'Сайт · Toiloff',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'description', content: 'Toiloff - это мой личный сайт с небольшим количеством информации обо мне, моих социальных сетях и моих проектах.' },
                { name: 'og:description', content: 'Toiloff - это мой личный сайт с небольшим количеством информации обо мне, моих социальных сетях и моих проектах.' },
                { name: 'keywords', content: 'toiloff, toil, developer, dev, coder, personal, website, toil site, тоил, сайт' },
                { name: 'og:locale', content: 'ru_RU' },
                { name: 'og:type', content: 'website' },
                { name: 'og:title', content: 'Сайт - Toiloff' },
                { name: 'og:site_name' },
                // { name: 'og:image', content: '/favicon.png'}
            ],
            link: [
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'}
            ]
            // link: [
            //     { rel: 'icon', type: 'image/png', href: '/favicon.png' }
            // ]
        }
    },
    vite: {
        // server: {
        //     https: {
        //         key: fs.readFileSync('/etc/letsencrypt/live/toiloff.ru/privkey.pem'),
        //         cert: fs.readFileSync('/etc/letsencrypt/live/toiloff.ru/fullchain.pem'),
        //     },
        //     hmr: {
        //         protocol: 'wss',
        //     }
        // }
    },
    env: {
        baseUrl: `http://0.0.0.0:${process.env.PORT}` || 'http://localhost:3000'
    },
    debug: false,
})
