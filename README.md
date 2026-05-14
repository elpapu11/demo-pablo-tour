# Pablo Tour — Landing Page Demo

> **Demo conceptual privada. No es el sitio web oficial de Pablo Tour.**
> **Private concept demo. Not the official Pablo Tour website.**

---

## Descripcion

Landing page demo premium y bilingue (EN/ES) para Pablo Tour Arequipa, operador turistico familiar especializado en el Cañon del Colca. Esta demo fue creada como propuesta comercial para modernizar la presencia digital del negocio.

## Stack Tecnologico

- **React 19** + TypeScript + Vite
- **Tailwind CSS** + shadcn/ui
- **Three.js** — Efecto de lente en el hero (escritorio)
- **GSAP** + ScrollTrigger — Animaciones scroll
- **Lenis** — Smooth scrolling
- **Lucide React** — Iconos

## Estructura del Proyecto

```
src/
  contexts/
    LanguageContext.tsx      # Contexto de idioma EN/ES
  data/
    translations.ts           # Todas las traducciones
  sections/
    Hero.tsx                  # Hero con efecto Three.js
    TrustBar.tsx              # Barra de confianza
    WhyPabloTour.tsx          # Por que Pablo Tour
    Tours.tsx                 # Cards de tours
    Story.tsx                 # Historia de la empresa
    Difference.tsx            # Diferenciadores
    Gallery.tsx               # Galeria de imagenes
    FAQ.tsx                   # Preguntas frecuentes
    FinalCTA.tsx              # CTA final WhatsApp
    Footer.tsx                # Footer + banner demo
  components/
    StickyWhatsApp.tsx        # Boton flotante WhatsApp (mobile)
  App.tsx                     # Composicion principal
  main.tsx                    # Entry point
  index.css                   # Estilos globales + fuentes
```

## Como Ejecutar Localmente

### Requisitos
- Node.js 20+
- npm

### Instalacion

```bash
# Clonar o descargar el proyecto
cd pablo-tour-demo

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Abrir en el navegador
# http://localhost:5173
```

### Build para produccion

```bash
npm run build
```

El output se genera en `/dist/` — listo para desplegar en Cloudflare Pages, Netlify, Vercel, o cualquier CDN estatico.

## Como Desplegar

### Cloudflare Pages
1. Subir la carpeta `dist/` como nuevo proyecto
2. Framework preset: None (static site)
3. Build command: `npm run build`
4. Build output: `dist`

### Netlify
1. Drag & drop la carpeta `dist/` en Netlify Drop
2. O conectar el repositorio y usar `npm run build`

### Vercel
```bash
npm i -g vercel
vercel --prod dist/
```

## Archivos de Documentacion

| Archivo | Contenido |
|---------|-----------|
| `public/asset-sources.md` | Fuentes de imagenes y notas de derechos |
| `public/copy-notes.md` | Notas sobre el copy reescrito |
| `public/datos-a-verificar-con-cliente.md` | Lista de datos pendientes de verificacion |

## Funcionalidades

- **Bilingue EN/ES** — Toggle de idioma en la navegacion
- **Hero con efecto de lente** — Three.js con distorsion cromatica (solo escritorio)
- **Animaciones scroll** — GSAP ScrollTrigger en todas las secciones
- **Cards de tours** — 6 tours verificados con meta-informacion
- **FAQ acordion** — 8 preguntas frecuentes bilingues
- **CTA WhatsApp** — Boton flotante en mobile + botones en pagina
- **Galeria con lightbox** — Grid responsive de 8 imagenes
- **Demo banner** — Aviso visible de que es una demo

## Datos Verificados (Web oficial www.pablotour.com)

- Fundacion: 1986 en Cabanaconde
- Oficina Arequipa: 1998
- Paulino "Pablo" Junco — primer guia del Canon del Colca
- Edwin Junco — guia trilingue (es/en/fr)
- Direccion: Jerusalen 400 AB-1, Arequipa
- WhatsApp: +51 941 414 048
- Email: perupablotour@gmail.com
- RUC: 20411856357
- Registro MINCETUR: desde 1999

## Limitaciones de esta Demo

- Todas las imagenes son generadas por IA (placeholder)
- No incluye precios (no estaban en la web original)
- No incluye sistema de reservas
- No incluye pasarela de pagos
- Formulario de contacto redirige a WhatsApp

## Licencia

Demo privada para presentacion. Todos los derechos del nombre "Pablo Tour" pertenecen a Pablo Tour E.I.R.L.
