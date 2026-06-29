## Project

Personal website frontend for Toiloff, built with Astro 7 and Bun.

## Development

- Use Bun for package management and scripts.
- Required Node version: `>=22.12.0`.
- Install dependencies with `bun install`.
- Run production checks with `bun run build`.
- Preview production output with `bun preview`.

When starting the dev server, use Astro background mode:

```sh
bun astro dev --background
```

Manage the background server with `bun astro dev stop`, `bun astro dev status`, and `bun astro dev logs`.

## Code Style

- Prefer `for...of` loops over `.forEach()` for iteration.

## Architecture

- Main layout: `src/layouts/Layout.astro`.
- Pages live in `src/pages/`; current routes are `/` (`index.astro`), `/about` (`about.astro`), and `/blog` (`blog.astro`).
- Global reset, design tokens, utility classes, and shared button styles live in `src/components/GlobalStyle.astro`.
- Site title metadata comes from `getEntry("settings", "settings")`, backed by `src/data/settings.json` through `src/content.config.ts`.
- `Layout.astro` includes `Header`, `Footer`, global styles, the Poppins font, Astro `ClientRouter`, and fade transitions for route changes.
- Elements marked with `data-reveal` are animated by the `IntersectionObserver` initialized in `Layout.astro` on every `astro:page-load`.
- Keep reusable section blocks in `src/components/<Group>/<Name>.astro` when a component belongs to a feature group.
- The icon directory is currently named `src/components/Icones/`; use the existing spelling unless deliberately renaming the whole folder.

## Design

### Styling

- Pure CSS with Astro scoped `<style>` blocks; no Tailwind, Bootstrap, or other CSS framework.
- Global tokens are CSS custom properties in `:root` and `[data-theme="light"]` inside `GlobalStyle.astro`.
- Dark-first theme: dark values are the default `:root`; light values are enabled with `data-theme="light"` on `body`.
- The theme tester in `Header.astro` toggles `document.body.dataset.theme`.
- Use BEM-like class names with kebab-case and `__` for elements, e.g. `.nav-list__item-link`.
- Prefer existing utility classes: `.button`, `.button_outline`, `.text-truncate`, and `.text-wrap`.
- Do not add unused `data-*` attributes; every data hook should be read by CSS or JavaScript.
- Preserve the current rounded-card, glass-header, soft-gradient, dark-first visual language unless explicitly redesigning.

### Design Tokens

| Token                           | Dark                      | Light                     |
| ------------------------------- | ------------------------- | ------------------------- |
| `--background`                  | `#05010d`                 | `#fff`                    |
| `--surface-bg`                  | `#131317`                 | `#f5f5f5`                 |
| `--onsurface-bg`                | `#27272a`                 | `#eaeaea`                 |
| `--onsurface-hover-bg`          | `#1d1d1d`                 | `#dddddd`                 |
| `--text-color`                  | `rgb(220, 220, 230)`      | `#0a0a0f`                 |
| `--text-muted`                  | `rgb(130, 130, 150)`      | `#616171`                 |
| `--text-hover-color`            | `#fff`                    | `#302f2f`                 |
| `--primary-color`               | `#ff6363`                 | `#ff6363`                 |
| `--logo-color`                  | `#fff`                    | `#0a0a0f`                 |
| `--stroke-color`                | `#3a3a3f`                 | `#c0c0c0`                 |
| `--header-bg`                   | `#1a1a1aa3`               | `#edededa3`               |
| `--header-link-color`           | `var(--text-color)`       | `var(--text-color)`       |
| `--header-link-hover-color`     | `var(--text-hover-color)` | `var(--text-muted)`       |
| `--button-bg`                   | `#e6e6e6`                 | `#05010d`                 |
| `--button-shadow-color`         | `var(--text-color)`       | `var(--text-color)`       |
| `--button-hover-color`          | `var(--text-hover-color)` | `var(--text-hover-color)` |
| `--button-text-color`           | `var(--background)`       | `var(--background)`       |
| `--button_outline-border-color` | `var(--stroke-color)`     | `var(--stroke-color)`     |
| `--button_outline-bg`           | `#28292e`                 | `#f0f0f0`                 |

### Typography

- Poppins is configured through Astro's font provider in `astro.config.mjs` and exposed as `--font-poppins`.
- Fallback stack: `"Inter", system-ui, sans-serif`.
- Base size: `16px`.

### Layout

- `.app` is a centered flex column with `max-width: 1280px` and `min-height: 100svh`.
- `main` is a flex column with `flex: 1`.
- Header is fixed within a 100px header area, pill-shaped (`border-radius: 1.75rem`), glassmorphic (`backdrop-filter: blur(64px)`), and `width: min-content` on desktop.
- Mobile breakpoints are mostly `500px`, with component-specific breakpoints where needed.

## Components

| Component         | File                                               | Purpose                                                             |
| ----------------- | -------------------------------------------------- | ------------------------------------------------------------------- |
| GlobalStyle       | `src/components/GlobalStyle.astro`                 | Global reset, tokens, utilities, shared button styles               |
| Header            | `src/components/Header.astro`                      | Fixed glass navigation and theme toggle                             |
| Footer            | `src/components/Footer.astro`                      | Site footer                                                         |
| Logo              | `src/components/Logo.astro`                        | Inline SVG logo                                                     |
| Hero              | `src/components/Hero.astro`                        | Home hero with decorative shapes and actions                        |
| PageSection       | `src/components/PageSection/PageSection.astro`     | Reusable revealed section wrapper with optional CTA link            |
| Project           | `src/components/Project/Project.astro`             | Project grid wrapper                                                |
| ProjectItem       | `src/components/Project/ProjectItem.astro`         | Project card                                                        |
| Stats             | `src/components/Stats/Stats.astro`                 | Stats card grid                                                     |
| StatsLines        | `src/components/Stats/StatsLines.astro`            | Decorative SVG line background for stats cards                      |
| Guestbook         | `src/components/Guestbook/Guestbook.astro`         | Guestbook list and intro copy                                       |
| GuestMessage      | `src/components/Guestbook/GuestMessage.astro`      | Guestbook message card, link normalization, platform icon selection |
| GuestMessageReply | `src/components/Guestbook/GuestMessageReply.astro` | Reply block inside a guestbook message                              |
| AboutCard         | `src/components/About/AboutCard.astro`             | About card component placeholder                                    |
| BlogHero          | `src/components/Blog/BlogHero.astro`               | Blog page title, search input, custom tag dropdown, and filter script |
| BlogPostList      | `src/components/Blog/BlogPostList.astro`           | Blog post grid and empty search state                               |
| BlogPostCard      | `src/components/Blog/BlogPostCard.astro`           | Blog post card with image, tag, title, description, date, and reading time |
| BlogPostHero      | `src/components/Blog/BlogPostHero.astro`           | Blog detail hero with dark image background and post metadata        |
| BlogPostLayout    | `src/components/Blog/BlogPostLayout.astro`         | Blog detail 70/30 content and sidebar grid                          |
| BlogPostContent   | `src/components/Blog/BlogPostContent.astro`        | Blog detail article sections                                        |
| BlogPostSidebar   | `src/components/Blog/BlogPostSidebar.astro`        | Blog detail authors and content anchor links                        |
| BlogPostAuthorCard | `src/components/Blog/BlogPostAuthorCard.astro`    | Blog detail author/member card                                      |
| Icones            | `src/components/Icones/*.astro`                    | Inline SVG icon components                                          |

## Pages

- `src/pages/index.astro`: home page with hero, projects, stats, and guestbook sections.
- `src/pages/about.astro`: about page with profile cards, social links, and tech stack icons.
- `src/pages/blog.astro`: blog list page with API-shaped placeholder posts, hero search, tag filtering, and post cards.
- `src/pages/blog/[slug].astro`: blog detail page generated from placeholder post records.

## Data And Content

- `src/content.config.ts` defines the `settings` collection using Astro's `file()` loader.
- `src/data/settings.json` stores `defaultTitle` and `defaultDelimiter`.
- Blog data currently uses local API-shaped placeholders in `src/data/blog.ts`; keep `BlogPost` and `BlogPostDetail` in `src/components/Blog/types.ts` aligned with the future API response.
- Keep structured site-wide settings in `src/data/settings.json` and update the schema in `src/content.config.ts` when adding fields.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
