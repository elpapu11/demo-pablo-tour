# AGENTS.md — Pablo Tour Landing Demo

> **This is a private concept demo. It is NOT the official Pablo Tour website.**
> **Demo conceptual privada. No es el sitio web oficial de Pablo Tour.**

---

## Project Overview

This is a premium, bilingual (English/Spanish) landing page demo for **Pablo Tour Arequipa**, a family-run tour operator specializing in Colca Canyon, Peru. The project is a single-page React application built as a commercial proposal to modernize the business's digital presence.

The application is a static site with no backend. All content is embedded in the frontend. Contact functionality redirects to WhatsApp. There is no booking system, no payment gateway, and no CMS.

### Verified Business Data (from www.pablotour.com)

- Founded: 1986 in Cabanaconde
- Arequipa office: 1998
- Founder: Paulino "Pablo" Junco — first guide in Colca Canyon
- Current director: Edwin Junco (trilingual: Spanish/English/French)
- Address: Jerusalén 400 AB-1, Arequipa, Peru
- WhatsApp: +51 941 414 048
- Email: perupablotour@gmail.com
- RUC: 20411856357
- MINCETUR registration: since 1999

---

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 19.2.0 |
| Language | TypeScript | ~5.9.3 |
| Build Tool | Vite | 7.2.4 |
| Styling | Tailwind CSS | 3.4.19 |
| UI Components | shadcn/ui (New York style) | — |
| Icons | Lucide React | 0.562.0 |
| Routing | react-router | 7.6.1 |
| Animations | GSAP + ScrollTrigger | 3.15.0 |
| Smooth Scroll | Lenis (via `@studio-freight/lenis`) | 1.0.42 |
| 3D/WebGL | Three.js | 0.184.0 |
| Forms | react-hook-form + Zod | 7.70.0 / 4.3.5 |
| Carousel | Embla Carousel | 8.6.0 |
| Charts | Recharts | 2.15.4 |

### Dev Dependencies

- ESLint 9 with flat config (`eslint.config.js`)
- `typescript-eslint` for TS linting
- `autoprefixer` + `postcss`
- `kimi-plugin-inspect-react` (Vite plugin for development)

---

## Project Structure

```
app/                          # Main application directory
├── public/                   # Static assets served at root
│   ├── images/               # AI-generated placeholder images
│   ├── asset-sources.md      # Image source documentation
│   ├── copy-notes.md         # Copywriting documentation
│   └── datos-a-verificar-con-cliente.md  # Pending client verification list
├── src/
│   ├── main.tsx              # Entry point — renders App into #root
│   ├── App.tsx               # Root component — composes all sections
│   ├── App.css               # Unused Vite scaffold styles (legacy)
│   ├── index.css             # Global styles, Tailwind directives, Google Fonts
│   ├── contexts/
│   │   └── LanguageContext.tsx   # React Context for EN/ES language switching
│   ├── sections/             # Page sections (composable blocks)
│   │   ├── Hero.tsx          # Hero with Three.js lens effect (desktop only)
│   │   ├── TrustBar.tsx      # Trust signals bar
│   │   ├── WhyPabloTour.tsx  # Value proposition
│   │   ├── Tours.tsx         # Tour cards grid
│   │   ├── Story.tsx         # Company history
│   │   ├── Difference.tsx    # Differentiators
│   │   ├── Gallery.tsx       # Image gallery with lightbox
│   │   ├── FAQ.tsx           # Accordion FAQ
│   │   ├── FinalCTA.tsx      # Final WhatsApp CTA
│   │   └── Footer.tsx        # Footer + demo banner
│   ├── components/
│   │   ├── StickyWhatsApp.tsx    # Floating WhatsApp button (mobile only)
│   │   └── ui/               # shadcn/ui components (40+ components)
│   ├── hooks/
│   │   └── use-mobile.ts     # useIsMobile hook (768px breakpoint)
│   ├── lib/
│   │   └── utils.ts          # cn() utility (clsx + tailwind-merge)
│   └── pages/
│       └── Home.tsx          # Unused Vite scaffold page (legacy)
├── index.html                # HTML entry point
├── vite.config.ts            # Vite config (base: './', port 3000)
├── tailwind.config.js        # Tailwind theme + custom colors/fonts
├── postcss.config.js         # PostCSS with Tailwind + Autoprefixer
├── tsconfig.json             # Project references (app + node)
├── tsconfig.app.json         # App TS config (strict, ES2022)
├── tsconfig.node.json        # Node/Vite TS config
├── eslint.config.js          # ESLint flat config
└── components.json           # shadcn/ui configuration

images/                       # Additional image assets at repo root
```

### Path Aliases

The `@/` alias maps to `./src/`. This is configured in `vite.config.ts`, `tsconfig.json`, and `tsconfig.app.json`.

```typescript
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
```

---

## Build and Development Commands

All commands run from the `app/` directory:

```bash
cd app

# Install dependencies
npm install

# Start development server (port 3000)
npm run dev

# Production build (outputs to app/dist/)
npm run build

# Preview production build
npm run preview

# Lint TypeScript/React files
npm run lint
```

### Build Details

- `npm run build` runs `tsc -b && vite build`
- Output directory: `app/dist/`
- `base: './'` in `vite.config.ts` means assets use relative paths (suitable for static hosting)
- The build is a static site — no SSR, no API routes

---

## Code Style Guidelines

### TypeScript

- **Strict mode enabled** (`strict: true` in `tsconfig.app.json`)
- Unused locals and parameters are errors (`noUnusedLocals`, `noUnusedParameters`)
- All imports must use `.tsx` extensions (`allowImportingTsExtensions`)
- `verbatimModuleSyntax: true` — use `import type` for type-only imports

### React Conventions

- Functional components with default exports for pages/sections
- Hooks follow the `useX` naming convention
- Custom hook `useLanguage()` from `LanguageContext` is the standard way to access translations
- shadcn/ui components use `data-slot` and `data-variant` attributes for styling targets

### Styling Conventions

- **Tailwind CSS** is the primary styling method
- Custom design tokens in `tailwind.config.js`:
  - `warm` — warm brown palette (50–900)
  - `terracotta` — brand accent color
  - `sage` — secondary green accent
  - `whatsapp` — WhatsApp green for CTAs
  - `font-display` — Playfair Display (serif)
  - `font-sans` — Inter (sans-serif)
- shadcn/ui uses CSS variables in `index.css` (HSL format)
- Custom animations defined in Tailwind config (`accordion-down`, `bounce-subtle`, etc.)
- GSAP ScrollTrigger is used for scroll-based entrance animations in sections

### Language/i18n Pattern

Translations are **hardcoded** in `LanguageContext.tsx` — not loaded from external files.

```typescript
const { lang, setLang, t } = useLanguage()

// Usage
{t('hero.title') as string}
```

- Keys use dot notation (e.g., `hero.title`, `tour.1.badge`)
- `t()` returns `string | Record<string, string>` — cast with `as string` for text content
- Default language: English (`'en'`)
- Supported: `'en' | 'es'`

### WhatsApp Integration

WhatsApp links are hardcoded constants repeated in multiple files:

```typescript
const WHATSAPP_URL = 'https://wa.me/51941414048?text=Hi%20Pablo%20Tour%2C%20I%27m%20interested%20in%20a%20Colca%20Canyon%20tour.%20My%20travel%20dates%20are%3A%20_____.%20Could%20you%20recommend%20the%20best%20option%3F'
```

This pattern appears in `Hero.tsx`, `Tours.tsx`, `StickyWhatsApp.tsx`, `FinalCTA.tsx`, and `Footer.tsx`.

---

## Testing

**There is no test suite in this project.**

No test runner (Jest, Vitest, Cypress, Playwright) is configured. The `package.json` has no `test` script.

If adding tests, consider:
- **Vitest** (aligns with the Vite ecosystem)
- **React Testing Library** for component tests
- **Playwright** for E2E testing of the landing page flow

---

## Deployment

The output is a static site in `app/dist/` ready for any static hosting provider.

### Cloudflare Pages
1. Build command: `npm run build`
2. Build output: `dist`
3. Framework preset: None (static site)

### Netlify
- Drag & drop `dist/` folder, or connect repo with `npm run build`

### Vercel
```bash
npm i -g vercel
vercel --prod dist/
```

---

## Security Considerations

1. **No authentication or authorization** — this is a public landing page.
2. **No user data collection** — the only user interaction is external WhatsApp links.
3. **WhatsApp links use `rel="noopener noreferrer"`** on all external anchors.
4. **No CSP headers configured** — add if deploying to production.
5. **All images are AI-generated placeholders** — must be replaced with client-authorized photos before any production use.
6. **No environment variables** — all configuration is baked into the build.

---

## Important Notes for Agents

- **Do not treat this as a production website.** It is explicitly a demo/proposal.
- **Images in `public/images/` are AI-generated placeholders.** See `public/asset-sources.md`.
- **The `images/` folder at the repo root** contains additional reference images not used in the build.
- **The `Home.tsx` and `App.css` files in `src/pages/` and `src/` are unused legacy files** from the Vite scaffold.
- **No API calls are made** — all data is static and embedded in the source code.
- **GSAP ScrollTrigger instances must be killed on unmount** to prevent memory leaks (see existing patterns in section components).
- **The Three.js hero effect is desktop-only** — it is conditionally skipped on mobile (`window.innerWidth < 768`).
- **The sticky WhatsApp button is mobile-only** — hidden on `md:` breakpoint.
- **Client verification checklist exists** in `public/datos-a-verificar-con-cliente.md`.
