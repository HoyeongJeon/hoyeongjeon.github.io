# Repository Scout Report

> Generated: 2026-03-18 | Repo: `hoyeongjeon.github.io`

---

## Detected Stack

### Languages

| Language         | Evidence                                                                               |
| ---------------- | -------------------------------------------------------------------------------------- |
| TypeScript       | `quartz.config.ts`, `quartz.layout.ts`, `tsconfig.json`, `quartz/**/*.tsx`             |
| SCSS             | `quartz/styles/custom.scss`, `quartz/styles/base.scss`, `quartz/styles/variables.scss` |
| Markdown         | `content/**/*.md` (all content)                                                        |
| JavaScript (ESM) | `quartz/bootstrap-cli.mjs`, `quartz/bootstrap-worker.mjs`                              |

### Frameworks & Major Libraries

| Library             | Version   | Evidence                                                        |
| ------------------- | --------- | --------------------------------------------------------------- |
| **Quartz**          | **4.5.2** | `package.json` → `"version": "4.5.2"`                           |
| Preact              | ^10.28.2  | `package.json`, `tsconfig.json` → `"jsxImportSource": "preact"` |
| esbuild             | ^0.27.2   | `package.json` devDependencies                                  |
| esbuild-sass-plugin | ^3.6.0    | `package.json` (SCSS bundling)                                  |
| shiki               | ^1.26.2   | `package.json` (syntax highlighting)                            |
| rehype-katex        | ^7.0.1    | `package.json` (LaTeX rendering)                                |
| remark-gfm          | ^4.0.1    | `package.json` (GitHub Flavored Markdown)                       |
| d3                  | ^7.9.0    | `package.json` (graph view)                                     |
| flexsearch          | ^0.8.205  | `package.json` (full-text search)                               |
| pixi.js             | ^8.15.0   | `package.json`                                                  |
| satori              | ^0.19.1   | `package.json` (OG image generation)                            |
| sharp               | ^0.34.5   | `package.json` (image processing)                               |
| prettier            | ^3.8.1    | `package.json` devDependencies                                  |
| typescript          | ^5.9.3    | `package.json` devDependencies                                  |
| tsx                 | ^4.21.0   | `package.json` devDependencies (test runner)                    |

### Build & Packaging

| Tool                   | Evidence                                   |
| ---------------------- | ------------------------------------------ |
| **Node.js v22.16.0**   | `.node-version`                            |
| npm ≥ 10.9.2           | `package.json` → `"engines"`               |
| `package-lock.json`    | lock file present (npm, not pnpm/yarn/bun) |
| ESM modules            | `package.json` → `"type": "module"`        |
| TypeScript strict mode | `tsconfig.json` → `"strict": true`         |

### Deployment & Runtime

| Target                 | Evidence                                                                               |
| ---------------------- | -------------------------------------------------------------------------------------- |
| **GitHub Pages**       | `.github/workflows/deploy.yml` → `actions/deploy-pages@v4`                             |
| Docker (optional)      | `Dockerfile` — multi-stage, `node:22-slim`, serves via `npx quartz build --serve`      |
| GitHub Actions CI      | `.github/workflows/ci.yaml` (upstream Quartz CI, targets `jackyzha0/quartz` repo only) |
| GitHub Actions Deploy  | `.github/workflows/deploy.yml` — triggers on `push` to `main`                          |
| GitHub Actions Preview | `.github/workflows/build-preview.yaml`, `deploy-preview.yaml`                          |
| Docker Hub             | `.github/workflows/docker-build-push.yaml`                                             |

---

## Conventions

### Formatting & Linting

- **Prettier** — configured in `.prettierrc`:
  - `printWidth: 100`, `tabWidth: 2`, `semi: false`, `trailingComma: "all"`, `quoteProps: "as-needed"`
- `.prettierignore` present
- No ESLint, no Stylelint, no pre-commit hooks

### Type Checking

- **TypeScript strict mode** (`tsconfig.json` → `strict: true`)
- `noUnusedLocals: true`, `noUnusedParameters: true`
- JSX via Preact (`"jsx": "react-jsx"`, `"jsxImportSource": "preact"`)
- `experimentalDecorators: true`

### Testing

- Runner: `tsx --test` (Node.js built-in test runner via tsx)
- No test files found in `content/` or `quartz/` at surface level
- Tests likely live in `quartz/` subdirectories (upstream Quartz framework tests)

### Documentation

- `docs/` — Quartz's own documentation (built with `npm run docs`)
- `CLAUDE.md` — project-specific AI assistant instructions (Korean)
- `README.md` — upstream Quartz README
- `CODE_OF_CONDUCT.md` — upstream Quartz CoC
- No custom `docs/` content for this blog

---

## Linting and Testing Commands

### Single "do everything" check

```bash
npm run check
# → tsc --noEmit && npx prettier . --check
# Source: package.json → "check" script
```

### Individual commands

```bash
# Type-check only
npx tsc --noEmit

# Format check
npx prettier . --check

# Auto-format (write)
npm run format
# → npx prettier . --write
# Source: package.json → "format" script

# Run tests
npm test
# → tsx --test
# Source: package.json → "test" script

# Build site
npx quartz build

# Local dev server (localhost:8080)
npx quartz build --serve

# Build + deploy to GitHub
npx quartz sync
```

---

## Project Structure Hotspots

```
hoyeongjeon.github.io/
├── quartz.config.ts          ← MAIN: site config, theme colors, plugins
├── quartz.layout.ts          ← MAIN: page layout / component composition
├── content/                  ← MAIN: all Markdown content (the "vault")
│   ├── index.md              ← Homepage (전호영 — backend developer intro)
│   ├── about.md              ← About page
│   ├── blog/
│   │   ├── index.md          ← Blog landing page
│   │   └── dev/              ← Dev category posts
│   │       ├── first-post.md
│   │       ├── second-post.md
│   │       └── 테스트.md
│   └── projects/
│       ├── index.md          ← Projects landing page
│       ├── project-alpha.md  ← Real-time notification service (Kotlin/Spring)
│       └── project-beta.md   ← Personal knowledge management tool
├── quartz/
│   ├── components/           ← All UI components (Preact TSX)
│   ├── styles/
│   │   ├── custom.scss       ← USER CUSTOMIZATIONS (Bauhaus/minimal aesthetic)
│   │   ├── base.scss         ← Quartz base styles (do not edit)
│   │   ├── variables.scss    ← Layout breakpoints, grid, spacing
│   │   ├── callouts.scss     ← Callout block styles
│   │   └── syntax.scss       ← Code syntax highlight styles
│   ├── plugins/              ← Transformer/filter/emitter plugins
│   ├── cfg.ts                ← Config type definitions
│   └── bootstrap-cli.mjs     ← CLI entry point
├── .github/workflows/
│   ├── deploy.yml            ← Production deploy (main → GitHub Pages)
│   ├── build-preview.yaml    ← PR preview build
│   └── deploy-preview.yaml   ← PR preview deploy
└── Dockerfile                ← Optional Docker runtime
```

---

## Do and Don't Patterns

### Do ✅

| Pattern                                            | Detail                                                            | Evidence                                    |
| -------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------- |
| **Obsidian wikilinks**                             | Internal links use `[[slug\|label]]` syntax                       | `content/index.md`, `content/blog/index.md` |
| **Frontmatter on every content file**              | Required fields: `title`, `date` (YYYY-MM-DD), `tags`, `draft`    | `content/blog/dev/first-post.md`            |
| **`draft: false` explicit**                        | Draft state is always explicitly declared                         | All content files                           |
| **Conventional Commits**                           | `feat` / `fix` / `docs` / `style` / `chore` prefix                | `CLAUDE.md`                                 |
| **Korean locale**                                  | `locale: "ko-KR"` in config; all UI text in Korean                | `quartz.config.ts`                          |
| **Geometric / Bauhaus aesthetic**                  | `border-radius: 0` on all interactive elements, weighted headings | `quartz/styles/custom.scss`                 |
| **Minimal right sidebar**                          | Only `TableOfContents` on desktop; no Graph, no Backlinks         | `quartz.layout.ts`                          |
| **No popovers**                                    | `enablePopovers: false`                                           | `quartz.config.ts`                          |
| **No analytics**                                   | `analytics: null`                                                 | `quartz.config.ts`                          |
| **Semi-colon-free TypeScript/JS**                  | `"semi": false` in Prettier                                       | `.prettierrc`                               |
| **Content in `content/blog/<category>/<slug>.md`** | Category-based folder structure                                   | `content/blog/dev/`                         |

### Don't ❌

| Pattern                                  | Detail                                        | Evidence                                           |
| ---------------------------------------- | --------------------------------------------- | -------------------------------------------------- |
| **Don't edit `quartz/styles/base.scss`** | User customizations go only in `custom.scss`  | `custom.scss` → `@use "./base.scss"` (import only) |
| **Don't add `date` to index pages**      | Index/landing pages omit `date` field         | `content/index.md`, `content/blog/index.md`        |
| **Don't use Graph component**            | Not included in either layout                 | `quartz.layout.ts` (absent)                        |
| **Don't use Backlinks component**        | Not included in either layout                 | `quartz.layout.ts` (absent)                        |
| **Don't use RecentNotes component**      | Not included in either layout                 | `quartz.layout.ts` (absent)                        |
| **Don't use `header:` slot**             | `sharedPageComponents.header = []` (empty)    | `quartz.layout.ts` line 7                          |
| **Don't use `afterBody:` slot**          | `sharedPageComponents.afterBody = []` (empty) | `quartz.layout.ts` line 8                          |
| **Don't commit private/ or templates/**  | Listed in `ignorePatterns`                    | `quartz.config.ts` line 18                         |

---

## Color Scheme / Theme

### Typography

| Role   | Font                                                               |
| ------ | ------------------------------------------------------------------ |
| Header | Inter                                                              |
| Body   | Inter                                                              |
| Code   | JetBrains Mono                                                     |
| Source | Google Fonts CDN (`fontOrigin: "googleFonts"`, `cdnCaching: true`) |

### Light Mode

| Token           | Value                  | Role                        |
| --------------- | ---------------------- | --------------------------- |
| `light`         | `#ffffff`              | Page background             |
| `lightgray`     | `#e8e8e8`              | Borders, subtle backgrounds |
| `gray`          | `#999999`              | Muted text                  |
| `darkgray`      | `#3d3d3d`              | Body text                   |
| `dark`          | `#1a1a1a`              | Headings                    |
| `secondary`     | `#c83232`              | Links, accents (red)        |
| `tertiary`      | `#d45555`              | Hover states                |
| `highlight`     | `rgba(200,50,50,0.08)` | Selection background        |
| `textHighlight` | `rgba(200,50,50,0.15)` | Text highlight              |

### Dark Mode

| Token           | Value                  | Role                          |
| --------------- | ---------------------- | ----------------------------- |
| `light`         | `#111111`              | Page background               |
| `lightgray`     | `#2a2a2a`              | Borders                       |
| `gray`          | `#666666`              | Muted text                    |
| `darkgray`      | `#cccccc`              | Body text                     |
| `dark`          | `#eeeeee`              | Headings                      |
| `secondary`     | `#e04040`              | Links, accents (brighter red) |
| `tertiary`      | `#e86060`              | Hover states                  |
| `highlight`     | `rgba(224,64,64,0.10)` | Selection background          |
| `textHighlight` | `rgba(224,64,64,0.15)` | Text highlight                |

**Theme summary**: Monochrome base (near-white / near-black) with a single red accent (`#c83232` / `#e04040`). Bauhaus-inspired — no rounded corners, strong typographic hierarchy.

### Syntax Highlighting

- Light: `github-light` (shiki)
- Dark: `github-dark` (shiki)
- `keepBackground: false` (uses theme background instead)

---

## Layout Components (quartz.layout.ts)

### Shared (all pages)

| Slot        | Component                                                         |
| ----------- | ----------------------------------------------------------------- |
| `head`      | `Head()`                                                          |
| `header`    | _(empty)_                                                         |
| `afterBody` | _(empty)_                                                         |
| `footer`    | `Footer({ links: { GitHub: "https://github.com/HoyeongJeon" } })` |

### Content Pages (`defaultContentPageLayout`)

| Slot         | Components                                                                      |
| ------------ | ------------------------------------------------------------------------------- |
| `beforeBody` | `ConditionalRender(Breadcrumbs, skip on index)`, `ArticleTitle`, `ContentMeta`  |
| `left`       | `PageTitle`, `MobileOnly(Spacer)`, `Flex([Search(grow), Darkmode])`, `Explorer` |
| `right`      | `DesktopOnly(TableOfContents)`                                                  |

### List Pages (`defaultListPageLayout`)

| Slot         | Components                                                                      |
| ------------ | ------------------------------------------------------------------------------- |
| `beforeBody` | `Breadcrumbs`, `ArticleTitle`, `ContentMeta`                                    |
| `left`       | `PageTitle`, `MobileOnly(Spacer)`, `Flex([Search(grow), Darkmode])`, `Explorer` |
| `right`      | _(empty)_                                                                       |

---

## Open Questions

1. **`content/blog/dev/테스트.md`** — Korean filename. Quartz handles Unicode slugs, but confirm the slug resolves correctly in production (may need `aliases` frontmatter if linking from other pages).
2. **`project-beta.md`** — referenced in `projects/index.md` but not read here; confirm it has proper frontmatter.
3. **No favicon** — `Plugin.Favicon()` is enabled but no custom favicon asset was found in `quartz/static/`. Quartz will generate a default one; add a custom `favicon.ico` or `favicon.png` to `quartz/static/` if needed.
4. **`docker-build-push.yaml`** — Docker image is built and pushed somewhere, but the registry target was not read. Clarify if Docker deployment is active or just exploratory.
