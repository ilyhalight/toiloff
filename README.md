# Toiloff — Personal Website

My personal website, built with [Astro 7](https://astro.build) and [Bun](https://bun.sh).

## Getting Started

Also, you need [toiloff-backend](https://github.com/ilyhalight/toiloff-backend)!

```sh
git clone https://github.com/ilyhalight/toiloff
bun install
bun dev
```

Open [localhost:4321](http://localhost:4321).

## Admin

To use the admin panel, you need to log in. You can do this by visiting the `/admin/login` page and entering your credentials.

If you open the admin panel without being logged in, you will be redirected to the login page.

## Static TUI

You can access the static TUI version with curl:

```bash
curl https://toil.cc
```

To view html instead of TUI with curl add `x-original: true` header:

```sh
curl -H "x-original: true" https://toil.cc
```

## Setup

1. Install [Bun](https://bun.sh/)
2. Install depends

```bash
bun i
```

3. Set a `PUBLIC_API_BASE_URL` in .env
4. Build it

```bash
bun run build
```

5. Run it

```bash
bun ./dist/server/entry.mjs
```
