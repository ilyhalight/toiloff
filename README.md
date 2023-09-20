# Toiloff.ru

**Toiloff.ru** - это мой персональный сайт, единственная цель которого рассказать немного обо мне и моих проектах. Сайт написан с помощью **Nuxt 3.7** и препроцессора **SASS**. На сайте имеется перевод на русский и английский языки, смена темы.

---

## Установка

1. Установите зависимости
```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```
2. Заполните порт сервера в .env

## Разработка

Запустите сервер разработки на http://localhost:3000

```bash
npm run dev
```

## Продакшен

Создайте приложение для продакшена:

```bash
npm run build
```

Локальный предварительный просмотр продакшен сборки:

```bash
npm run preview
```

Запуск с помощью PM2:
1. Установите зависимости:
```bash
npm install pm2 -g && pm2 install pm2-logrotate
```
2. Запустите сервер
```bash
pm2 start ecosystem.config.js
```
3. [Если пользуетесь Cloudflare] Отключить Minify HTML в Cloudflare для избежания ошибок

Ознакомьтесь с [документацией по развертыванию](https://nuxt.com/docs/getting-started/deployment ) для получения дополнительной информации.