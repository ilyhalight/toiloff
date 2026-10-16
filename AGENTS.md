## Project

Personal website frontend for Toiloff, built with Astro 7, Svelte 5, and Bun. It is a server-rendered app (`output: "server"` with `@wyattjoh/astro-bun-adapter`) that talks to a separate backend ([toiloff-backend](https://github.com/ilyhalight/toiloff-backend)) over HTTP. It includes a public site and a cookie-authenticated admin area under `/admin`.

## Development

- Use Bun for package management and scripts.
- Required Node version: `>=22.22.0`.
- Install dependencies with `bun install`.
- Scripts in `package.json`: `dev` (`astro dev`), `build` (`astro build`), `preview` (`astro preview`), and `astro`. There are no test, lint, or typecheck scripts.
- Run production checks with `bun run build`.
- Preview production output with `bun preview`.
- Run the built server with `bun ./dist/server/entry.mjs`.
- Pages that call the API need the backend running. In dev, Vite proxies `/api` to `http://localhost:3001` with the `/api` prefix stripped (see `astro.config.mjs`).
- Environment variables are declared in the `env.schema` of `astro.config.mjs` and read via `astro:env/client`: `PUBLIC_API_BASE_URL` (default `http://localhost:4321/api/v1`), `PUBLIC_WEBRING_BASE` (must start with `https://`), and `PUBLIC_MY_WEBRING_SLUG`. `.env.example` shows a local `.env`; the deploy workflow sets `PUBLIC_API_BASE_URL` to the production URL.
- Pushes to `main` trigger `.github/workflows/deploy.yml` (SSH deploy that runs `bun install --frozen-lockfile` and `bun run build`).

When starting the dev server, use Astro background mode:

```sh
bun astro dev --background --host
```

Manage the background server with `bun astro dev stop`, `bun astro dev status`, and `bun astro dev logs`.

## Code Style

- Prefer `for...of` loops over `.forEach()` for iteration.
- TypeScript uses `astro/tsconfigs/strict`.
- Svelte components use Svelte 5 runes (`$props`, `$state`, `$derived`) and `<script lang="ts">`.
- Import Zod from `astro/zod`.

## Architecture

- Output is `server` (on-demand rendering). Most pages that fetch data or are admin-only also set `export const prerender = false;`.
- Main layout: `src/layouts/Layout.astro`.
- Pages live in `src/pages/`; see [Pages](#pages) for the current route list.
- Global reset, design tokens, utility classes, and shared button styles live in `src/components/GlobalStyle.astro`.
- Site title metadata comes from `getEntry("settings", "settings")`, backed by `src/data/settings.json` through `src/content.config.ts`.
- `Layout.astro` includes `Header`, `Footer`, global styles, and the Poppins font (`<Font cssVariable="--font-poppins" />`). It reads the `tf_theme` cookie server-side and sets it as `data-theme` on `<body>`. There is no `ClientRouter`/view transitions; navigation is a full page load.
- `src/middleware.ts` runs only for `/admin*` paths and populates `Astro.locals.user` (typed in `src/env.d.ts`); see [API Layer](#api-layer).
- Interactive UI is written as Svelte components hydrated with `client:load`; static/server-only blocks are `.astro` components. Keep reusable blocks in `src/components/<Group>/<Name>.(astro|svelte)` when a component belongs to a feature group.
- `src/lib/modal.ts` (`showModal`, `showImageOverlay`, `closeModal`) and `src/lib/alert.ts` (`tmAlert`, `tmClose` toast) mount Svelte components into `document.body` from client code. `src/lib/adapter.ts` (`componentToSnippet`) wraps a component as a Svelte snippet.
- `src/lib/utils.ts` holds shared helpers (`toFormData`, `dateFormatter`, `formatSeconds`, `daysBetween`, `returnError`).
- `src/lib/local-storage/guestbook.ts` stores the visitor's own submitted guestbook messages in `localStorage` (`guestbook-messages`, validated with Zod) so they appear locally before moderation.
- Captcha: `Form.svelte` with `enabledCaptcha` renders `Captcha.svelte` (altcha, challenge URL from `src/data/captcha.ts`) and passes the payload to `submitAction(captchaPayload)`.
- The icon directory is currently named `src/components/Icones/`; use the existing spelling unless deliberately renaming the whole folder. It contains both `.astro` and `.svelte` icons.

## API Layer

Backend access lives in `src/lib/api/`, one module per backend domain, each exporting standalone functions and their types. There is no barrel file (`index.ts`) and no global API object; every function is a named export so unused ones are tree-shaken.

| File                        | Purpose                                                                                                            |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `src/lib/api/internal.ts`   | Shared `fetchFromAPI`, `isError`, `CursorNav`, and public URL bases (`BASE_PUBLIC_URL`, `AVATAR_BASE_URL`, `IMAGES_BASE_URL`) |
| `src/lib/api/bff.ts`        | Aggregated page endpoints for SSR pages: `getMainPage()` (`bff`) and `getModelsPage()` (`bff/models`)              |
| `src/lib/api/auth.ts`       | `getToken`, `verify`, `AUTH_COOKIE_NAME`, `AUTH_LOGIN_PAGE`, `ADMIN_DASHBOARD_PAGE`                                |
| `src/lib/api/guestbook.ts`  | Public and admin guestbook calls, Zod schemas for entries, `getAvatar`                                             |
| `src/lib/api/projects.ts`   | Project list/detail, admin create/edit/delete, `changePosition` (drag-and-drop ordering)                           |
| `src/lib/api/stats.ts`      | `load`, `getModels`, and `DEFUALT_DATA` fallback (spelling is the existing export name)                            |
| `src/lib/api/webring.ts`    | Backend webring data (`get`) and admin `clearCache`                                                                |
| `src/lib/api/adminImages.ts`| Admin image upload/list/delete and image URL helpers                                                               |

Conventions:

- Add a new function as `export const name = async (...) => await fetchFromAPI<T>(path, body?, captchaPayload?, options?)` in the matching domain file (or create a new `<domain>.ts` file). Keep response types in the same file. Do not add a barrel or a global object.
- `fetchFromAPI` (in `internal.ts`) builds `${PUBLIC_API_BASE_URL}/${path}`. It sends `POST` when a `body` is passed and `GET` otherwise; pass `options.method` for `PATCH`/`DELETE`. JSON `Content-Type` is set unless the body is `FormData`. It always sends `x-client` and `credentials: "include"`, adds `x-captcha-payload` when a captcha payload is given, and throws `Error` for `{ error }` responses, `404`, and `422`.
- Function names are short and unprefixed (`getAll`, `load`, `create`); callers import the module as a namespace so the alias gives context: `import * as ProjectsAPI from "../lib/api/projects"`. Aliases in use: `ProjectsAPI`, `GuestbookAPI`, `StatsAPI`, `WebringAPI`, `AdminImagesAPI`, `BFF`, and `ExternalWebringAPI`. Use named imports for constants, types (`import type`), and one-off helpers (`AUTH_LOGIN_PAGE`, `getToken`, `DEFUALT_DATA`).
- The same modules are used on the server (Astro frontmatter, middleware) and in the browser (Svelte components). Server-side page loads wrap calls in `.catch(() => fallback)` so a page still renders when the backend is down (e.g. `BFF.getMainPage().catch(...)` with `DEFUALT_DATA`).
- `src/pages/index.astro` and `src/pages/models.astro` fetch their data through `bff.ts` in one request; use a BFF function rather than several separate calls when adding page-level data. `bff.ts` reuses types from the other API modules via `import type`.
- `src/lib/external-api/` is for third-party services (not the Toiloff backend). `shared.ts` exports `fetchJSON`, which has a 3s timeout and never throws (returns `{ status, data | error }`). `webring.ts` fetches the public webring service and maps it to the backend `WebringData` shape; import it as `import * as ExternalWebringAPI from "../../lib/external-api/webring"`.

Auth and cookies:

- The admin token lives in the `tf_auth_token` cookie (`AUTH_COOKIE_NAME`). `AdminLoginForm.svelte` calls `getToken` (with a captcha payload) in the browser; the frontend code never writes this cookie itself and relies on `credentials: "include"` with the backend response.
- `src/middleware.ts` only handles `/admin*`: for `/admin/logout` it deletes the cookie; otherwise it calls `verify(token)` (which forwards the cookie manually through a `Cookie` header, since server-side fetches have no browser cookies) and sets `context.locals.user` to the `UserEntry` or `null`.
- Admin pages (except `login` and `logout`) check `Astro.locals.user` and `return Astro.redirect(AUTH_LOGIN_PAGE)` when it is empty. `login` redirects to `ADMIN_DASHBOARD_PAGE` when a user is already signed in. Admin mutations run client-side from Svelte components and are authorized by the cookie.

## Design

### Styling

- Pure CSS with Astro/Svelte scoped `<style>` blocks; no Tailwind, Bootstrap, or other CSS framework.
- Global tokens are CSS custom properties in `:root` and `[data-theme="light"]` inside `GlobalStyle.astro`.
- Dark-first theme: dark values are the default `:root`; light values are enabled with `data-theme="light"` on `body`.
- `ThemeSwitcher.astro` toggles `document.body.dataset.theme` and persists it in the `tf_theme` cookie (read by `Layout.astro`); it is used in desktop preferences from `Header.astro` and in `MobileNav.astro`.
- Use BEM-like class names with kebab-case and `__` for elements, e.g. `.nav-list__item-link`.
- Prefer existing utility classes from `GlobalStyle.astro`: `.button` (with `.button_outline`, `.button_primary`, `.button_loading`), `.button-text`, `.link` (with `.link_boxed`), `.textfield`, `.text-truncate`, `.text-wrap`, and `.text-danger`.
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
| `--warning-color`               | `#facc15`                 | `#facc15`                 |
| `--success-color`               | `#4ade80`                 | `#4ade80`                 |
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

Theme-independent tokens defined only in `:root`:

- `--primary-surface-bg`: `color-mix(in srgb, var(--primary-color), transparent 84%)`.
- `--overlay-shadow`: `0 1rem 3rem rgba(0, 0, 0, 0.26)`.
- `--container-max-width`: `1280px`.

### Typography

- Poppins is configured through Astro's font provider in `astro.config.mjs` (Google provider) and exposed as `--font-poppins`.
- Fallback stack: `"Inter", system-ui, sans-serif`.
- Base size: `16px`.

### Layout

- `.app` is a centered flex column with `max-width: var(--container-max-width)` (`1280px`) and `min-height: 100svh`.
- `main` is a flex column with `flex: 1`.
- Header is fixed within a 100px header area, pill-shaped (`border-radius: 1.75rem`), glassmorphic (`backdrop-filter: blur(64px)`), and `width: min-content` on desktop.
- Mobile breakpoints are mostly `500px`, with component-specific breakpoints where needed.
- `body:has(.overlay)` disables page scroll while a modal or image overlay is open.

## Components

| Component                | File                                                      | Purpose                                                                         |
| ------------------------ | --------------------------------------------------------- | ------------------------------------------------------------------------------- |
| GlobalStyle              | `src/components/GlobalStyle.astro`                        | Global reset, tokens, utilities, shared button styles                           |
| Header                   | `src/components/Header.astro`                             | Fixed glass navigation, desktop preferences, and mobile nav trigger             |
| Footer                   | `src/components/Footer.astro`                             | Site footer                                                                     |
| Logo                     | `src/components/Logo.astro`                               | Inline SVG logo                                                                 |
| MobileNav                | `src/components/MobileNav.astro`                          | Mobile sheet navigation and mobile preferences                                  |
| Preferences              | `src/components/Preferences.astro`                        | Details-based preferences popover                                               |
| PreferenceRow            | `src/components/PreferenceRow.astro`                      | Label/description row for preference controls                                   |
| ThemeSwitcher            | `src/components/ThemeSwitcher.astro`                      | Dark/light theme toggle (persists `tf_theme` cookie)                            |
| Hero                     | `src/components/Hero.astro`                               | Home hero with decorative shapes, actions, and the webring block                |
| SystemMessage            | `src/components/SystemMessage.svelte`                     | Titled status/empty/error message card                                          |
| TimedMessage             | `src/components/TimedMessage.svelte`                      | Toast container mounted by `tmAlert`                                            |
| PageSection              | `src/components/PageSection/PageSection.astro`            | Reusable section wrapper with title and optional CTA link                       |
| SectionWrapper           | `src/components/Section/SectionWrapper.astro`             | Generic page/section stack wrapper                                              |
| SectionHero              | `src/components/Section/SectionHero.astro`                | Shared section title and description block with optional extra content          |
| SectionCard              | `src/components/Section/SectionCard.svelte`               | Titled surface card                                                             |
| SectionLoading           | `src/components/Section/SectionLoading.svelte`            | Loading state block with spinner                                                |
| Breadcrumbs              | `src/components/Breadcrumbs/Breadcrumbs.svelte`           | Breadcrumb navigation with JSON-LD; exports the `Breadcrumb` type              |
| BreadcrumbsItem          | `src/components/Breadcrumbs/BreadcrumbsItem.svelte`       | Single breadcrumb link                                                          |
| Webring                  | `src/components/Webring/Webring.svelte`                   | Webring block; refreshes data from the external webring API on mount            |
| WebringItem              | `src/components/Webring/WebringItem.svelte`               | Previous/next webring site item                                                 |
| Stats                    | `src/components/Stats/Stats.astro`                        | Stats card grid (GitHub and token stats)                                        |
| StatsItem                | `src/components/Stats/StatsItem.astro`                    | Stats card shell                                                                |
| StatsItemContent         | `src/components/Stats/StatsItemContent.astro`             | Icon, value, and label row inside a stats card                                  |
| ProjectsWrapper          | `src/components/Projects/ProjectsWrapper.svelte`          | Projects list; renders `ProjectItem` or `ProjectAdminItem` (`isAdmin`)          |
| ProjectList              | `src/components/Projects/ProjectList.svelte`              | Cursor-paginated project list with infinity-scroll loading                      |
| ProjectItem              | `src/components/Projects/ProjectItem.svelte`              | Public project card                                                             |
| ProjectAdminItem         | `src/components/Projects/ProjectAdminItem.svelte`         | Admin project row with grip, edit, and delete (confirm modal) actions           |
| ProjectEmpty             | `src/components/Projects/ProjectEmpty.svelte`             | Empty projects message                                                          |
| SortableProjectList      | `src/components/Projects/SortableProjectList.svelte`      | `ProjectList` using the sortable wrapper (extra layer needed for `client:load`) |
| SortableProjectsWrapper  | `src/components/Projects/SortableProjectsWrapper.svelte`  | Drag-and-drop ordering with SortableJS, saved via `ProjectsAPI.changePosition`  |
| ModelsList               | `src/components/Models/ModelsList.svelte`                 | Top models by token usage list                                                  |
| ModelsHeroContent        | `src/components/Models/ModelsHeroContent.astro`           | Total/month token metrics for the models page hero                              |
| GuestbookContent         | `src/components/Guestbook/GuestbookContent.astro`         | Form and message-list grid; loads the first page and offline fallback           |
| Guestbook                | `src/components/Guestbook/Guestbook.svelte`               | Message list with load-more and local (pending) messages                        |
| GuestbookForm            | `src/components/Guestbook/GuestbookForm.svelte`           | Create-message form (captcha, avatar upload, random name)                       |
| GuestMessage             | `src/components/Guestbook/GuestMessage.svelte`            | Guestbook message card with link normalization                                  |
| GuestMessageReply        | `src/components/Guestbook/GuestMessageReply.svelte`       | Reply block inside a guestbook message                                          |
| GuestMessageDate         | `src/components/Guestbook/GuestMessageDate.svelte`        | Formatted message date                                                          |
| GuestbookMessageIcon     | `src/components/Guestbook/GuestbookMessageIcon.svelte`    | Platform icon selected from the message link                                    |
| GuestbookMessageStatus   | `src/components/Guestbook/GuestbookMessageStatus.svelte`  | Moderation status badge                                                         |
| GuestbookMessageEdit     | `src/components/Guestbook/GuestbookMessageEdit.svelte`    | Admin moderation card (approve, decline, reply, force delete)                   |
| GuestbookSkeletonMessage | `src/components/Guestbook/GuestbookSkeletonMessage.svelte`| Skeleton card shown while loading more messages                                 |
| GuestbookZeroMessage     | `src/components/Guestbook/GuestbookZeroMessage.svelte`    | Empty guestbook message                                                         |
| AboutCard                | `src/components/About/AboutCard.astro`                    | About profile detail card                                                       |
| AboutSocialItem          | `src/components/About/AboutSocialItem.astro`              | About page social link item                                                     |
| Form                     | `src/components/Form/Form.svelte`                         | Form shell: submit handling, status, toast, optional captcha                    |
| FormField                | `src/components/Form/FormField.svelte`                    | Labeled text input                                                              |
| FormHead                 | `src/components/Form/FormHead.svelte`                     | Form title and description                                                      |
| FormLabel                | `src/components/Form/FormLabel.svelte`                    | Field label                                                                     |
| FormStatus               | `src/components/Form/FormStatus.svelte`                   | Inline success/error status; exports the `Status` type                          |
| FormSwitch               | `src/components/Form/FormSwitch.svelte`                   | Labeled switch field (wraps `Control/Switch`)                                   |
| FormDropzone             | `src/components/Form/FormDropzone.svelte`                 | File/image drop zone                                                            |
| FormDropzoneWrapper      | `src/components/Form/FormDropzoneWrapper.svelte`          | Label wrapper around a dropzone                                                 |
| FormActions              | `src/components/Form/FormActions.svelte`                  | Positioned container for small field actions                                    |
| FormActionItem           | `src/components/Form/FormActionItem.svelte`               | Small outline action button inside a field                                      |
| Switch                   | `src/components/Control/Switch.svelte`                    | Toggle switch control                                                           |
| SegmentedControl         | `src/components/Control/SegmentedControl.svelte`          | Segmented filter control                                                        |
| Captcha                  | `src/components/Captcha/Captcha.svelte`                   | Invisible altcha widget with `run()` returning the payload                      |
| Modal                    | `src/components/Modal/Modal.svelte`                       | Modal dialog mounted by `showModal`                                             |
| ModalConfirmContent      | `src/components/Modal/ModalConfirmContent.svelte`         | Confirmation modal body                                                         |
| Overlay                  | `src/components/Utils/Overlay.svelte`                     | Fixed blurred backdrop for modals                                               |
| ImageOverlay             | `src/components/Utils/ImageOverlay.svelte`                | Full image viewer mounted by `showImageOverlay`                                 |
| InfinityScroll           | `src/components/Utils/InfinityScroll.svelte`              | IntersectionObserver trigger for loading more items                             |
| Dropdown                 | `src/components/Dropdown/Dropdown.astro`                  | Custom dropdown control (currently not imported anywhere)                       |
| AdminLoginForm           | `src/components/Admin/AdminLoginForm.svelte`              | Admin login form with captcha                                                   |
| AdminActions             | `src/components/Admin/AdminActions.svelte`                | Card of admin links/buttons (`Link` type exported)                              |
| AdminIndexActions        | `src/components/Admin/AdminIndexActions.svelte`           | Dashboard actions (guestbook, projects, images, clear webring cache)            |
| AdminConfirmForm         | `src/components/Admin/AdminConfirmForm.svelte`            | Generic confirm form that redirects after success                               |
| AdminCreateProjectForm   | `src/components/Admin/AdminCreateProjectForm.svelte`      | Create project form                                                             |
| AdminEditProjectForm     | `src/components/Admin/AdminEditProjectForm.svelte`        | Edit project form                                                               |
| AdminGuestbookPanel      | `src/components/Admin/AdminGuestbookPanel.svelte`         | Guestbook moderation panel with status filters and infinity scroll              |
| AdminsImagesList         | `src/components/Admin/AdminsImagesList.svelte`            | Admin image grid with preview and delete                                        |
| AdminsImagesUpload       | `src/components/Admin/AdminsImagesUpload.svelte`          | Admin image upload form                                                         |
| Icones                   | `src/components/Icones/*.{astro,svelte}`                  | Inline SVG icon components (mixed Astro and Svelte)                             |

## Pages

- `src/pages/index.astro` (`/`): home page with hero (webring), projects, stats, and guestbook sections; data from `BFF.getMainPage()`.
- `src/pages/about.astro` (`/about`): about page with profile cards, social links, and tech stack icons.
- `src/pages/ai-disclosure.astro` (`/ai-disclosure`): AI usage disclosure page.
- `src/pages/blog.astro` (`/blog`): "under construction" placeholder with image and home link (no blog posts or detail pages exist yet).
- `src/pages/projects.astro` (`/projects`): full paginated projects list.
- `src/pages/models.astro` (`/models`): top models by usage, data from `BFF.getModelsPage()`.
- `src/pages/404.astro` (`/404`): custom not-found page with image asset and home link.
- `src/pages/admin/index.astro` (`/admin`): dashboard with stats and admin actions.
- `src/pages/admin/login.astro` (`/admin/login`) and `src/pages/admin/logout.astro` (`/admin/logout`, redirects to login; the cookie is removed by middleware).
- `src/pages/admin/guestbook/index.astro` (`/admin/guestbook`): guestbook moderation.
- `src/pages/admin/projects/index.astro` (`/admin/projects`), `src/pages/admin/projects/create.astro` (`/admin/projects/create`), and `src/pages/admin/projects/[projectId]/edit.astro` (`/admin/projects/:projectId/edit`): sortable project list, create, and edit.
- `src/pages/admin/images/index.astro` (`/admin/images`) and `src/pages/admin/images/upload.astro` (`/admin/images/upload`): image management.
- `src/pages/admin/projects/[projectId]/index.ts` is a helper module (`getPageProject`) used by `edit.astro`; it does not export an HTTP handler.
- There are no API endpoint routes in this app; all backend calls go to the external backend through `src/lib/api/`.

## Data And Content

- `src/content.config.ts` defines the `settings` collection using Astro's `file()` loader (a blog collection is present only as commented-out code).
- `src/data/settings.json` stores `defaultTitle` and `defaultDelimiter`.
- Keep structured site-wide settings in `src/data/settings.json` and update the schema in `src/content.config.ts` when adding fields.
- `src/data/captcha.ts` holds the altcha challenge URL (derived from `PUBLIC_API_BASE_URL`).
- Site content (projects, stats, guestbook messages, images) comes from the backend API, not from local data files.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Middleware](https://docs.astro.build/en/guides/middleware/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Svelte integration (`@astrojs/svelte`)](https://docs.astro.build/en/guides/integrations-guide/svelte/)
- [Environment variables (`astro:env`)](https://docs.astro.build/en/guides/environment-variables/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
