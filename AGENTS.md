## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Design

### Styling
- Pure CSS with Astro scoped `<style>` blocks — no framework (Tailwind, Bootstrap, etc.)
- Global reset and design tokens defined in `src/components/GlobalStyle.astro` via CSS custom properties in `:root`
- Dark-first theme (`data-theme="dark"` default), toggled to `data-theme="light"` via a script in Header
- BEM-like class naming (kebab-case with `__` for elements, e.g. `.nav-list__item`)

### Design Tokens (GlobalStyle)
| Token | Dark | Light |
|---|---|---|
| `--background` | `#05010d` | `#fff` |
| `--text-color` | `rgb(220, 220, 230)` | `#0a0a0f` |
| `--text-muted` | `rgb(130, 130, 150)` | — |
| `--text-muted-color` | — | `#616171` |
| `--text-hover-color` | `#fff` | `#302f2f` |
| `--primary-color` | `#ff6363` | `#ff6363` |
| `--logo-color` | `#fff` | `#0a0a0f` |
| `--stroke-color` | `#3a3a3f` | `#c0c0c0` |
| `--header-bg` | `#1a1a1aa3` | `#edededa3` |
| `--button-bg` | `#e6e6e6` | `#05010d` |
| `--button-text-color` | `var(--background)` | `var(--background)` |
| `--button-hover-color` | `var(--text-hover-color)` | `var(--text-hover-color)` |
| `--button-shadow-color` | `var(--text-color)` | `var(--text-color)` |
| `--button_outline-border-color` | `var(--stroke-color)` | `var(--stroke-color)` |
| `--button_outline-bg` | `#28292e` | `#f0f0f0` |

### Typography
- **Poppins** from Google Fonts (fetched via Astro's font provider, exposed as `--font-poppins`)
- Fallback: `"Inter", system-ui, sans-serif`
- Base size: `16px`

### Layout
- `.app` container: `max-width: 1280px`, centered, full viewport height
- Header: pill-shaped (`border-radius: 1.75rem`), glassmorphism (`backdrop-filter: blur(64px)`), `width: min-content`
- Main: `flex: 1` to fill remaining space
- Uses `getEntry("settings", "settings")` from content collection to build page title (`{title}{delimiter}Toiloff`)

### Components
| Component | File | Purpose |
|---|---|---|
| GlobalStyle | `src/components/GlobalStyle.astro` | Global CSS + design tokens |
| Header | `src/components/Header.astro` | Fixed top nav with glass effect |
| Logo | `src/components/Logo.astro` | Inline SVG icon |
| Hero | `src/components/Hero.astro` | Hero section with personal branding |

### Pages
- `src/pages/index.astro` — home page using Layout, demonstrates CSS variable usage

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
