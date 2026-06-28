# Toiloff — Personal Website

Personal website for Toiloff.

Built with [Astro](https://astro.build).

## Getting Started

```sh
git clone <repo-url>
bun install
bun dev
```

Open [localhost:4321](http://localhost:4321).

## Project Structure

```text
/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── GlobalStyle.astro
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   └── Logo.astro
│   ├── data/
│   │   └── settings.json
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

## Commands

| Command       | Action                               |
| :------------ | :----------------------------------- |
| `bun install` | Install dependencies                 |
| `bun dev`     | Start dev server at `localhost:4321` |
| `bun build`   | Build to `./dist/`                   |
| `bun preview` | Preview production build             |
