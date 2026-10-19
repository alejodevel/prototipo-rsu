# RSU Ambiental — prototipo HTML + CSS + JS

Abrir `index.html` (o servir la carpeta con cualquier servidor estático).

## Estructura
- `index.html`, `nosotros.html`, `servicios.html`, `contacto.html`, `blog.html`, `politica-privacidad.html`
- `servicios/*.html` — 7 landings (cabecera simplificada, formulario visible, barra de contacto móvil) pensadas para Google Ads
- `blog/*.html` — 3 artículos de ejemplo
- `assets/css/style.css` — tokens de paleta/tipografía arriba del archivo; componentes después
- `assets/js/main.js` — menú, hero rotativo con pausa, formularios (demo), cookies, panel de estilo
- `assets/fonts/` — fuentes variables autoalojadas (sin Google Fonts)
- `sitemap.xml`, `robots.txt`

## Panel "Estilo"
Botón flotante inferior izquierdo: 4 paletas × 4 combinaciones tipográficas. Es solo del prototipo (eliminar `.proto` y su JS al pasar a WordPress). Para fijar la elección final, cambiar los valores por defecto en `:root` de `style.css`.

## Paso a WordPress (Kadence + child theme)
- Tokens → `theme.json` / variables CSS del child theme.
- Servicios → CPT `servicio` con campos (ACF o similar): H1, lead, incluye[], para quién[], FAQ[]; plantilla única = landing.
- Blog → entradas nativas. Formularios → Fluent Forms / CF7 con eventos `generate_lead`.
- SEO → Rank Math o Yoast: título/descripción por página, canonical, sitemap. El JSON-LD ya está en cada página (Organization, Service, FAQPage, BreadcrumbList, BlogPosting).
- Cookies/consent → plugin de consentimiento compatible con Google Consent Mode v2.
- Rendimiento → precargar la fuente principal, imágenes WebP con `width/height` y `loading="lazy"`, sin page builder pesado en landings.

## Pendientes de contenido
Fotografías reales, dirección de oficina (mapa), logo original en alta (SVG/PNG), revisión legal de la política de privacidad, confirmar textos de servicios (p. ej. "Gestión patio trasero").
