# Arquitectura — Web de Mia Salazar

**Versión:** 1.0
**Fecha:** agosto 2026
**Stack:** Angular (standalone + signals) · SCSS · GitHub Pages

---

## 1. Contexto del proyecto

Sitio web de presentación de **Mia Salazar**, música, productora, multiinstrumentista y cineasta. Origen mexicano y andaluz, nacida en Barcelona, residente en Estocolmo durante una década y actualmente en Hamburgo.

Su proyecto actual es una colección de canciones sobre **duelo migratorio y reconstrucción de identidad**, organizada en cuatro actos:

| Acto | Título | Canciones publicadas |
|---|---|---|
| I | La muerte | *Mantas* |
| II | *(sin publicar)* | — |
| III | La transformación | *Ajolote*, *Despatriada* |
| IV | El viaje | *Escuchando a Dios* |

**Objetivo único de la página:** que quien llega entienda quién es Mia y escuche su música. Todo lo demás es secundario.

**Elemento central:** un retrato interactivo. Al pulsar sobre distintas partes del cuerpo se abren fragmentos de su biografía (idiomas, instrumentos, migraciones, el ajolote). El cuerpo funciona como índice del contenido.

---

## 2. Stack y justificación

| Capa | Elección | Por qué |
|---|---|---|
| Framework | **Angular 22** (standalone + signals, **zoneless**) | El equipo ya domina Angular. Compila a estático, suficiente para GitHub Pages. Zoneless porque el estado es 100% signals y no hay dependencias de terceros que necesiten zone.js. |
| Estilos | **SCSS** con custom properties | Los tokens de diseño viven en CSS variables, editables sin recompilar. Sin framework de utilidades: el diseño es demasiado específico para Tailwind. |
| Animación | **CSS** (keyframes/transiciones) para microinteracciones puntuales; `@angular/animations` se añadirá solo si aparece algo que lo necesite de verdad (secuencias coordinadas entre varios elementos) | El popup ya usa CSS puro y es suficiente; evita una dependencia que hasta ahora no ha hecho falta. |
| Routing | **Angular Router** con `withHashLocation()` — decidido, no `404.html` | GitHub Pages no soporta rewrites del lado servidor (ver §9). |
| Idioma | **Español + inglés**, prefijo de ruta (`/es/`, `/en/`) con servicio de locale propio | Público repartido entre España, México, Suecia y Alemania. Ver §5.5. |
| Estado | **Signals** + servicios `providedIn: 'root'` | No hace falta NgRx: el estado es mínimo (popup abierto, acto activo, idioma). |
| Contenido | **Archivos TypeScript tipados** en `src/app/data/` | Sin CMS ni backend. Editar contenido = editar un archivo y hacer push. |
| Accesibilidad | **`@angular/cdk/a11y`** (`CdkTrapFocus`) | Única dependencia externa añadida hasta ahora, ya prevista en §5.2. |
| Tests | **Vitest** (test runner por defecto de Angular 22) | Viene de serie con `ng new`; no se ha evaluado ninguna alternativa por ahora. |
| Imágenes | **sharp** (dev dependency) vía `scripts/process-images.mjs` | Genera AVIF/WebP en varios anchos antes de commitear (ver §7). Construido ya en la Fase 2 para poder usar la foto placeholder del retrato, no solo en la Fase 4. |
| Hosting | **GitHub Pages** + GitHub Actions | Gratuito, HTTPS incluido, dominio propio soportado. |
| Formularios | **Formspree / Buttondown** (embed externo) | Pages no ejecuta backend. Ver §8. |

### Lo que GitHub Pages NO puede hacer

- Ejecutar código de servidor (no hay API propia, no hay base de datos).
- Procesar formularios (necesita servicio externo).
- Server-Side Rendering real (SSR/Angular Universal queda descartado; si en el futuro se necesita, hay que migrar a Netlify, Vercel o Cloudflare Pages).
- Redirecciones o rewrites configurables (de ahí el truco del `404.html`).

Para este proyecto ninguna de estas limitaciones es bloqueante.

---

## 3. Estructura de carpetas

Estado real a fecha de la Fase 2 (✅ construido, ⬜ aún no):

```
miasalazar/                         # nombre del repo; el proyecto Angular interno se llama mia-salazar-web
├── .github/
│   └── workflows/
│       └── deploy.yml              # ✅ CI: test + build + deploy a Pages
├── assets-source/                  # ✅ originales sin procesar (fuera del árbol de build de Angular)
│   └── retrato/
│       └── mia-retrato-original.png
├── scripts/
│   └── process-images.mjs          # ✅ genera AVIF/WebP en varios anchos con sharp (construido en Fase 2, no en Fase 4)
├── public/
│   ├── CNAME                       # ⬜ solo cuando haya dominio propio
│   ├── .nojekyll                   # ✅
│   ├── favicon.ico                 # ✅ (favicon.svg queda pendiente, de momento el .ico por defecto de ng new)
│   └── og-image.jpg                # ⬜ Fase 5
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/
│   │   │   │   └── lang.guard.ts           # ✅ sincroniza :lang con LocaleService, redirige si no es válido
│   │   │   ├── services/
│   │   │   │   ├── content.service.ts      # ✅ sirve datos tipados según idioma activo
│   │   │   │   ├── locale.service.ts       # ✅ idioma activo (signal), persistencia, detección inicial
│   │   │   │   ├── popup.service.ts        # ✅ estado del popup activo + punto de origen para la animación
│   │   │   │   └── seo.service.ts          # ⬜ Fase 5: title + meta tags + hreflang por ruta
│   │   │   └── models/
│   │   │       ├── hotspot.model.ts        # ✅
│   │   │       ├── acto.model.ts           # ✅
│   │   │       ├── cancion.model.ts        # ✅
│   │   │       └── locale.model.ts         # ✅ type Locale = 'es' | 'en'
│   │   ├── data/
│   │   │   ├── es/
│   │   │   │   ├── hotspots.data.ts        # ✅ (varios campos siguen en TODO, ver §13)
│   │   │   │   ├── actos.data.ts           # ✅ (descripción de Actos I y IV en TODO)
│   │   │   │   └── bio.data.ts             # ⬜
│   │   │   ├── en/
│   │   │   │   ├── hotspots.data.ts        # ✅
│   │   │   │   ├── actos.data.ts           # ✅
│   │   │   │   └── bio.data.ts             # ⬜
│   │   │   └── canciones.data.ts           # ✅ los 4 singles publicados, IDs de Spotify verificados
│   │   ├── features/
│   │   │   ├── home/
│   │   │   │   └── home.component.*        # ✅ monta <app-retrato> + <app-actos>
│   │   │   ├── retrato/
│   │   │   │   ├── retrato.component.ts    # ✅ imagen + hotspots + filamentos calculados + lista alternativa
│   │   │   │   ├── retrato.component.html
│   │   │   │   └── retrato.component.scss
│   │   │   ├── actos/
│   │   │   │   └── actos.component.*       # ✅ los 4 actos + canciones, Acto II en pendiente
│   │   │   └── contacto/
│   │   │       └── contacto.component.*    # ⬜
│   │   ├── shared/
│   │   │   ├── popup/
│   │   │   │   └── popup.component.*       # ✅ modal accesible reutilizable
│   │   │   ├── lazy-media/
│   │   │   │   └── lazy-media.component.*  # ✅ embed de Spotify con carga diferida (YouTube: ⬜, sin IDs aún)
│   │   │   └── directives/
│   │   │       └── reveal-on-scroll.directive.ts  # ⬜
│   │   ├── app.component.ts                # ✅ cabecera + selector ES/EN + <html lang> dinámico
│   │   ├── app.config.ts                   # ✅ withHashLocation()
│   │   └── app.routes.ts                   # ✅ :lang + redirectTo por función
│   ├── assets/
│   │   ├── img/
│   │   │   ├── retrato/                    # ✅ AVIF/WebP en 640/1024/1179px (foto placeholder)
│   │   │   ├── canciones/                  # ✅ AVIF/WebP en 320/640px — carátulas reales, no placeholder
│   │   │   └── galeria/                    # ⬜ Fase 4
│   │   └── fonts/                          # ⬜ Fraunces/Inter aún no autoalojadas, ver §7
│   ├── styles/
│   │   ├── _tokens.scss                    # ✅ paleta, tipografía, espaciado
│   │   ├── _mixins.scss                    # ✅ (vacío por ahora)
│   │   ├── _reset.scss                     # ✅
│   │   └── styles.scss                     # ✅ punto de entrada global
│   ├── index.html                          # ✅ (meta OG/JSON-LD pendientes, Fase 5)
│   └── main.ts
├── angular.json
├── package.json
└── README.md
```

**Nota sobre `features/escucha/`:** el árbol original de §3 preveía un componente separado para los embeds de Spotify/YouTube. En la práctica, `ActosComponent` + `LazyMediaComponent` ya cubren esa responsabilidad sin necesitar una feature aparte — no se ha creado esa carpeta, no es un olvido.

---

## 4. Modelo de datos

Todo el contenido está tipado. Añadir una canción o un hotspot no debería requerir tocar ningún componente.

```typescript
// core/models/hotspot.model.ts
export type ParteCuerpo = 'ojos' | 'boca' | 'manos' | 'pecho' | 'pies';

export interface Hotspot {
  id: ParteCuerpo;
  /** Posición en % sobre el contenedor del retrato */
  posicion: { x: number; y: number };
  /** Texto del aria-label, describe el destino no la parte del cuerpo */
  etiquetaAccesible: string;
  eyebrow: string;
  titulo: string;
  cuerpo: string;
  /** Cita de letra, opcional */
  letra?: string;
  /** Conecta el hotspot con un acto, para colorear el filamento */
  actoRelacionado?: number;
}
```

```typescript
// core/models/acto.model.ts
export interface Acto {
  numero: 1 | 2 | 3 | 4;
  titulo: string;              // 'La muerte'
  publicado: boolean;          // el Acto II aún no existe
  descripcion: string;
  cancionIds: string[];
}
```

```typescript
// core/models/cancion.model.ts
export interface Cancion {
  id: string;                  // 'ajolote'
  titulo: string;
  acto: 1 | 2 | 3 | 4;
  fechaLanzamiento: string;    // ISO
  spotifyTrackId?: string;
  youtubeId?: string;
  bandcampAlbumId?: string;
  portadaUrl: string;
  letra?: string[];            // array de versos
}
```

**Regla:** los IDs de Spotify/YouTube se guardan sueltos, nunca la URL completa del embed. El componente construye la URL. Así, si cambia el formato del embed, se toca un sitio.

**Implementado con una convención más:** `portadaUrl` es la ruta base sin extensión ni ancho (p. ej. `assets/img/canciones/mantas-portada`), igual que el retrato. `LazyMediaComponent` añade `-320`/`-640` y `.avif`/`.webp` para construir el `<picture>`, así que añadir una canción con carátula responsive no requiere tocar el componente — solo generar los archivos con `scripts/process-images.mjs` y apuntar `portadaUrl` a la base.

---

## 5. Componentes

### 5.1 `RetratoComponent` — el corazón del sitio

Responsabilidad: mostrar la foto, posicionar los hotspots, dibujar los filamentos SVG y emitir qué hotspot se ha pulsado.

```
┌──────────────────────────────────┐
│  .stage (position: relative)     │
│  ┌────────────────────────────┐  │
│  │ <picture> foto duotono     │  │  z-index: 1
│  │ ┌──────────────────────┐   │  │
│  │ │ <svg> filamentos     │   │  │  z-index: 3
│  │ │  · · · · hotspots    │   │  │  z-index: 4
│  │ └──────────────────────┘   │  │
│  └────────────────────────────┘  │
└──────────────────────────────────┘
```

Puntos críticos:

- **Los hotspots son `<button>` reales**, no divs. Esto da foco por teclado, `Enter`/`Space` y semántica gratis.
- Posiciones en **porcentajes**, nunca en píxeles, para que escalen con la imagen.
- Área táctil mínima **44×44px** aunque el punto visible sea de 8px (usar padding transparente).
- Además de los hotspots, hay una **lista alternativa** debajo de la imagen con los mismos cinco enlaces, siempre presente en el DOM. Implementada: en escritorio/tablet (`min-width: 700px`) se oculta *visualmente* con la técnica `visually-hidden` (no `display:none`), así que sigue alcanzable con teclado y lector de pantalla aunque no se vea; por debajo de ese ancho se ve como una lista de texto simple. Se descartó ocultarla por tipo de puntero (`pointer`/`hover`) porque Safari en iPad lo reporta como táctil sin hover, y eso la mostraba siempre ahí — justo lo contrario de lo que se quería.
- Los filamentos SVG usan `viewBox="0 0 100 100"` con coordenadas derivadas de las mismas posiciones de los hotspots — deben calcularse, no escribirse a mano dos veces.

### 5.2 `PopupComponent` — modal accesible

Requisitos no negociables:

- `role="dialog"` + `aria-modal="true"` + `aria-labelledby` apuntando al título.
- **Focus trap**: el tabulador no debe escaparse del modal mientras está abierto.
- Al cerrar, el foco **vuelve al hotspot que lo abrió**.
- `Escape` cierra. Click en el fondo cierra.
- `overflow: hidden` en el body mientras está abierto.

Angular CDK (`@angular/cdk/a11y`) resuelve esto sin escribirlo a mano. Es la única dependencia externa que merece la pena añadir. **Implementado con `CdkTrapFocus` + `cdkTrapFocusAutoCapture`**; `LiveAnnouncer` no ha hecho falta hasta ahora.

### 5.3 `LazyMediaComponent` — embeds diferidos

Un iframe de Spotify o YouTube carga entre 500KB y 1MB y coloca cookies de terceros antes de que nadie pulse play. Solución: mostrar la portada del disco como placeholder y **sustituirla por el iframe real solo al hacer clic**.

Beneficios: carga inicial mucho más rápida, mejor puntuación Lighthouse, y menos exposición de cookies de terceros (relevante para RGPD, ver §8).

**Implementado (solo Spotify por ahora, YouTube queda para cuando haga falta):** verificado con Playwright que 0 iframes se cargan antes de interactuar y exactamente 1 aparece tras el clic, con el `spotifyTrackId` correcto. La URL del iframe (`open.spotify.com/embed/track/{id}`) se sanitiza con `DomSanitizer.bypassSecurityTrustResourceUrl` solo en el momento del clic, nunca antes.

**Lección de tamaño:** el embed de Spotify no reajusta bien su contenido por debajo de ~280px de ancho — el título se corta por ambos lados sin puntos suspensivos en vez de envolver o truncar con ellipsis. Se usa el embed "normal" (`height="352"`, pensado para columnas estrechas tipo carátula) en vez del compacto (`height="152"`, pensado para filas anchas), y las tarjetas del grid tienen un mínimo de `18rem` (`.acto__canciones` en `actos.component.scss`). No se pudo contrastar contra Spotify en vivo durante el desarrollo porque su dominio está bloqueado en el entorno de red de Claude Code — se ajustó con el feedback visual de Mia en su propio navegador.

### 5.4 `ActosComponent`

Los cuatro actos, cada uno con sus canciones. El Acto II se renderiza en estado "pendiente" a partir del flag `publicado: false` — no se comenta el código ni se borra, para que publicar el acto sea cambiar un booleano.

**Implementado.** Los `spotifyTrackId` de las 4 canciones publicadas están verificados contra los singles reales del artista (no inventados). Las portadas (`portadaUrl`, ver §4) son las carátulas reales que pasó Mia directamente por chat — no se pudieron descargar de Spotify por el mismo bloqueo de red. `fechaLanzamiento` sigue en `TODO` en las 4: el buscador usado para verificar los IDs no expone fecha de publicación.

### 5.5 Internacionalización (ES/EN)

**Decisión: NO usar el i18n nativo de Angular (`@angular/localize`).** Ese sistema genera un build completo por idioma en tiempo de compilación — dos carpetas `dist/` distintas, dos despliegues, y cualquier cambio de contenido obliga a recompilar ambos. Es la opción correcta para aplicaciones grandes con equipo de traducción dedicado; aquí es más complejidad de la que el proyecto necesita.

**En su lugar: un `LocaleService` propio basado en signals**, con el idioma como prefijo de ruta.

```typescript
// core/models/locale.model.ts
export type Locale = 'es' | 'en';

// core/services/locale.service.ts
@Injectable({ providedIn: 'root' })
export class LocaleService {
  private readonly _locale = signal<Locale>(this.detectarInicial());
  readonly locale = this._locale.asReadonly();

  cambiar(locale: Locale) {
    this._locale.set(locale);
    localStorage.setItem('ms-locale', locale);
  }

  private detectarInicial(): Locale {
    const guardado = localStorage.getItem('ms-locale');
    if (guardado === 'es' || guardado === 'en') return guardado;
    return navigator.language.startsWith('en') ? 'en' : 'es';
  }
}
```

**Rutas con prefijo de idioma:**

```typescript
// app.routes.ts
export const routes: Routes = [
  { path: '', redirectTo: localeInicial(), pathMatch: 'full' },
  {
    path: ':lang',
    children: [
      { path: '', loadComponent: () => import('./features/home/home.component') },
      { path: 'actos', loadComponent: () => import('./features/actos/actos.component') },
      // ...
    ],
  },
];
```

Con `withHashLocation()` (§9), las URLs quedan como `/#/es/actos` y `/#/en/actos`. Un guard de ruta sincroniza el `:lang` de la URL con el `LocaleService` al navegar, para que ambos nunca queden desincronizados.

**Contenido**: cada archivo de datos existe por duplicado en `data/es/` y `data/en/`, implementando la misma interfaz (`Hotspot`, `Acto`, etc.). El `ContentService` decide cuál servir según `LocaleService.locale()`. Lo que **no** se traduce — títulos de canciones, IDs de Spotify/YouTube, fechas — vive en `canciones.data.ts`, compartido.

```typescript
// core/services/content.service.ts
@Injectable({ providedIn: 'root' })
export class ContentService {
  private locale = inject(LocaleService);

  hotspots = computed(() =>
    this.locale.locale() === 'en' ? HOTSPOTS_EN : HOTSPOTS_ES
  );
}
```

**Selector de idioma**: un control simple (ES / EN) en la cabecera, siempre visible, que llama a `locale.cambiar()`. Nunca ocultarlo dentro de un menú.

**Por qué prefijo de ruta y no solo un toggle en memoria**: sin prefijo, cada idioma comparte la misma URL y un enlace compartido en redes siempre abre en el idioma por defecto del visitante que lo recibe, no en el que el remitente pretendía compartir. Con prefijo, un enlace a `/#/en/actos` es siempre la versión en inglés, sea quien sea quien lo abra — y permite indexar ambas versiones por separado (§10).

---

## 6. Sistema de diseño

Los tokens viven en `styles/_tokens.scss` como custom properties de CSS, disponibles en toda la app.

```scss
:root {
  /* Paleta — tensión frío nórdico / calor migrante */
  --c-ink:        #10151F;   /* fondo base, aguas heladas */
  --c-ink-soft:   #171F2B;   /* fondo secundario */
  --c-slate:      #4A5A6B;   /* texto de apoyo, líneas */
  --c-terracota:  #B8543A;   /* raíz mexicana-andaluza */
  --c-ajolote:    #E3919C;   /* acento emocional, hotspots */
  --c-hueso:      #EDE6DD;   /* texto principal */

  /* Tipografía */
  --f-display: 'Fraunces', Georgia, serif;   /* títulos, letras */
  --f-body:    'Inter', system-ui, sans-serif; /* UI, textos */

  /* Escala tipográfica (fluida) */
  --t-xs:  0.75rem;
  --t-sm:  0.875rem;
  --t-md:  1rem;
  --t-lg:  clamp(1.25rem, 3vw, 1.6rem);
  --t-xl:  clamp(1.6rem, 5vw, 2.4rem);
  --t-2xl: clamp(2.4rem, 8vw, 5rem);

  /* Espaciado */
  --s-1: 0.5rem;  --s-2: 1rem;   --s-3: 1.5rem;
  --s-4: 2rem;    --s-6: 3rem;   --s-8: 5rem;

  /* Movimiento */
  --e-suave: cubic-bezier(0.22, 0.61, 0.36, 1);
}
```

**Intención del sistema:** la serif cálida (Fraunces, con itálicas expresivas) frente a la sans fría (Inter) reproduce tipográficamente la tensión biográfica entre lo mediterráneo/mexicano y lo nórdico. No es decoración: es el argumento del sitio.

**Regla de color:** el fondo es siempre frío. El calor (terracota, rosa ajolote) solo aparece en elementos activos — hotspots, popups abiertos, citas de letras. El calor emerge desde dentro del frío, nunca al revés.

---

## 7. Rendimiento

El sitio es visualmente pesado por naturaleza (fotos grandes, vídeo, audio). Presupuesto objetivo: **menos de 1MB en la carga inicial**, LCP por debajo de 2,5s en 4G.

### Imágenes

- Formato **AVIF con fallback WebP**, mediante `<picture>` con varios `<source>`.
- Tres anchos por imagen (640 / 1024 / 1600px) servidos con `srcset` + `sizes`.
- `loading="lazy"` en todo excepto el retrato principal, que lleva `fetchpriority="high"`.
- `width` y `height` explícitos siempre, para evitar saltos de layout (CLS).
- Las fotos originales **se procesan antes de subirlas al repo**, no en tiempo de build. Un script con `sharp` en `/scripts` genera todas las variantes.

### Fuentes

Self-hosted en `assets/fonts/`, no desde Google Fonts. Motivos: evita una petición a un tercero, mejora el LCP y elimina un problema de RGPD (Google Fonts transmite la IP del visitante). Usar `font-display: swap` y precargar solo el peso del display que aparece en el hero.

### Vídeo

Nunca alojado en el repositorio. GitHub Pages tiene un límite recomendado de 1GB por sitio y no está pensado para servir vídeo. Opciones: YouTube/Vimeo embebido con `LazyMediaComponent`, o Cloudflare Stream si se quiere un reproductor sin marca.

### Bundle

- Todas las rutas secundarias con `loadComponent()` (lazy loading).
- Revisar el resultado con `ng build --stats-json` + `source-map-explorer`.
- Angular CDK importado por módulos concretos, nunca entero.

---

## 8. Privacidad y contenido de terceros

Al ser un sitio europeo con visitantes europeos, conviene resolverlo bien desde el principio:

- **Sin analítica invasiva.** Si se quiere medir tráfico, usar una alternativa sin cookies (Plausible, GoatCounter, Cloudflare Web Analytics). Evita el banner de cookies por completo.
- **Embeds diferidos** (§5.3): al no cargar el iframe hasta que el visitante pulsa, no se colocan cookies de terceros sin acción explícita.
- **Formularios**: Formspree o Buttondown, enlazados o embebidos. Nunca recoger emails sin una política de privacidad enlazada.
- **Fuentes self-hosted** (§7).

---

## 9. Despliegue en GitHub Pages

### El problema del routing

GitHub Pages sirve archivos estáticos sin capacidad de rewrites. Si alguien entra directamente a `/es/actos`, Pages busca un archivo en esa ruta, no lo encuentra y devuelve 404 — aunque Angular sepa manejar esa ruta.

**Dos soluciones, elegir una:**

**A) Hash location (recomendada para empezar)**
```typescript
// app.config.ts
provideRouter(routes, withHashLocation())
```
Las URLs quedan como `/#/es/actos` o `/#/en/actos`. Funciona siempre, sin trucos. Estéticamente menos limpio y ligeramente peor para SEO — mitigado en parte porque las etiquetas `hreflang` (§10) no dependen de que la URL sea "limpia", solo de que sea estable.

**B) Copia de `index.html` como `404.html`**
Pages sirve `404.html` para cualquier ruta no encontrada; si ese archivo es la app Angular, la app arranca y resuelve la ruta. URLs limpias (`/es/actos`), pero cada carga profunda pasa técnicamente por un 404 (los buscadores lo toleran, pero no es ideal).

Dado que este sitio es esencialmente una sola página larga con anclas, **la opción A es más que suficiente** y evita complicaciones. El prefijo de idioma (§5.5) funciona igual con cualquiera de las dos.

### `base-href`

- **Con dominio propio** (`miasalazar.com`) → `--base-href=/`
- **Sin dominio propio** (`eariasvalor.github.io/miasalazar`) → `--base-href=/miasalazar/` ← **valor actual en uso** (el repo se llama `miasalazar`, no `mia-salazar-web` — ese es solo el nombre interno del proyecto Angular dentro del repo, usado en `dist/mia-salazar-web/browser`)

Equivocarse aquí es la causa número uno de "se ve todo sin estilos" tras el primer deploy.

### Workflow de CI

Versiones verificadas y en uso a fecha de la Fase 1 (comprobar si hay más recientes antes de tocar este archivo):

```yaml
# .github/workflows/deploy.yml
name: Deploy a GitHub Pages

on:
  push:
    branches: [main]
    # + rama de trabajo mientras no usamos PRs a main, ver nota más abajo
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run test -- --watch=false
      - run: npm run build -- --base-href=/miasalazar/
      - uses: actions/configure-pages@v6
      - uses: actions/upload-pages-artifact@v5
        with:
          path: dist/mia-salazar-web/browser

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v5
```

> **Verificar antes de usar de nuevo:** las versiones de arriba se comprobaron en agosto de 2026; revisar si hay más recientes antes de volver a tocar este archivo. La ruta `dist/mia-salazar-web/browser` ya está confirmada contra Angular 22 (build real, no supuesto).

En el repositorio: **Settings → Pages → Source: GitHub Actions** — imprescindible; con "Deploy from a branch" Pages sirve los archivos del repo tal cual, sin ejecutar `ng build`, y solo se ve el `README.md` renderizado (nos pasó una vez).

**Nota temporal:** mientras no abrimos PRs de esta rama a `main`, el trigger incluye también `claude/arquitectura-prompt-7ii17r` para poder ver los cambios desplegados sin mergear. Quitar esa rama del trigger en cuanto se retome el flujo de PRs.

### Checklist de dominio propio

1. Archivo `public/CNAME` con una sola línea: `miasalazar.com`
2. DNS del registrador: registros `A` a las IPs de GitHub Pages, o `CNAME` a `usuario.github.io`
3. Settings → Pages → activar **Enforce HTTPS** (tarda unos minutos en estar disponible)

---

## 10. SEO y compartición

Al ser un sitio sin SSR, los buscadores dependen de que renderice JavaScript. Google lo hace; otros crawlers y, sobre todo, **los previsualizadores de redes sociales, no**.

Por eso, las metaetiquetas críticas van **escritas directamente en `index.html`**, no inyectadas por Angular:

```html
<title>Mia Salazar — Duelo migratorio en cuatro actos</title>
<meta name="description" content="...">
<meta property="og:title" content="Mia Salazar">
<meta property="og:description" content="...">
<meta property="og:image" content="https://.../og-image.jpg">
<meta property="og:type" content="music.musician">
<meta name="twitter:card" content="summary_large_image">
```

Añadir también un bloque JSON-LD de tipo `MusicGroup` con los enlaces a Spotify, Instagram y TikTok — es lo que alimenta el panel lateral de Google.

**Etiquetas `hreflang`**, para que Google indexe la versión española e inglesa por separado y no las trate como contenido duplicado:

```html
<link rel="alternate" hreflang="es" href="https://miasalazar.com/#/es/">
<link rel="alternate" hreflang="en" href="https://miasalazar.com/#/en/">
<link rel="alternate" hreflang="x-default" href="https://miasalazar.com/#/es/">
```

El `SeoService` debe actualizar `<title>`, `og:title`, `og:description` y estas etiquetas `hreflang` cada vez que cambia la ruta o el idioma — no solo al cargar la página. Como el sitio no tiene SSR, esto ayuda al indexado pero no lo garantiza al 100%: si más adelante el posicionamiento en buscadores resulta crítico, ese es el argumento para migrar a una plataforma con SSR (Cloudflare Pages, Vercel), no antes.

---

## 11. Accesibilidad — mínimos exigibles

No es una capa opcional al final; se comprueba en cada PR.

- Contraste **AA mínimo** (4.5:1 en texto normal). *Atención:* el rosa ajolote `#E3919C` sobre fondo oscuro pasa, pero el terracota `#B8543A` sobre `#10151F` queda justo — usarlo solo en bordes y acentos, nunca en texto de párrafo.
- Foco visible siempre. Nunca `outline: none` sin sustituto.
- Todo lo interactivo alcanzable por teclado, en orden lógico.
- `prefers-reduced-motion: reduce` respetado: sin pulsos, sin parallax, sin reveals.
- Textos alternativos reales en las fotos (describir la imagen, no repetir "Mia Salazar").
- `<html lang>` actualizado dinámicamente por el `LocaleService` (`"es"` o `"en"`, nunca fijo).
- El retrato interactivo **siempre** con alternativa navegable en lista.

---

## 12. Fases

**Fase 1 — Esqueleto ✅ completada**
Proyecto Angular, tokens de diseño, despliegue funcionando en Pages con una página en blanco. Desplegar el primer día, aunque no haya nada que ver, evita sorpresas al final.

**Fase 2 — Retrato ✅ completada** (contenido aún parcial, ver §13)
`RetratoComponent` + `PopupComponent` con contenido real. Es el núcleo: si esto no funciona bien, el resto no importa. Falta: foto definitiva (se usa una placeholder), textos de ojos/manos/pies (marcados `TODO` en `hotspots.data.ts`), fuentes Fraunces/Inter autoalojadas.

**Fase 3 — Actos y música ✅ completada**
`ActosComponent`, `LazyMediaComponent`, embeds de las cuatro canciones publicadas. IDs de Spotify y carátulas reales (no inventados ni placeholder). Falta: fechas de lanzamiento (`TODO`), descripción de los Actos I y IV, embeds de YouTube (sin IDs todavía).

**Fase 4 — Galería y audiovisual ⬜**
Fotografías, vídeos, material de prensa.

**Fase 5 — Pulido ⬜**
Auditoría Lighthouse, accesibilidad, metadatos, dominio propio, pruebas en dispositivos reales.

---

## 13. Decisiones abiertas

Ya resuelto: el sitio será **bilingüe, español e inglés** (§5.5). El contenido biográfico se limita a lo que Mia ha aprobado explícitamente para la web — no se incluyen detalles de entrevistas u otras fuentes que ella no haya decidido compartir en este contexto.

Pendientes de resolver con Mia:

- **¿Newsletter?** Si va a ir publicando canción a canción, tener una lista propia vale más que depender del algoritmo de Spotify.
- **Fotografía definitiva del retrato** y sus derechos de uso (las de prensa suelen tener crédito de fotógrafo obligatorio). De momento se usa una foto placeholder de busto; además de no ser la definitiva, no muestra pies y dificulta ubicar bien las manos, así que las posiciones de esos dos hotspots son provisionales. (Las carátulas de las 4 canciones ya son las reales — eso sí está resuelto.)
- **Nombre del Acto II** cuando se publique.
- **Textos definitivos en inglés**: si los traduce ella misma o se encarga el equipo — afecta al tono, sobre todo en las citas de letras, donde una traducción literal puede perder el registro. Resuelto parcialmente: el texto de "boca" (saludo en los cinco idiomas) es idéntico en ambos locales por naturaleza, así que no depende de esta decisión.
- **Textos aún en `TODO` en `hotspots.data.ts`**: la historia de "ojos" (raíces/infancia), detalle de "manos" (¿más instrumentos?) y fechas del mapa de "pies". Confirmados hasta ahora: los cinco idiomas de "boca" (español, catalán, inglés, sueco, alemán).
- **Fechas de lanzamiento** de las 4 canciones (`fechaLanzamiento: 'TODO'` en `canciones.data.ts`) — el buscador usado para verificar los IDs de Spotify no expone esa fecha.
- **Descripción de los Actos I y IV** en `actos.data.ts` (el III ya tiene la del concepto del ajolote, ya aprobado en el brief).
- **IDs de YouTube**, si se quiere ofrecer esa alternativa además de Spotify.