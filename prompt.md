## PROMPT

Eres un desarrollador frontend senior especializado en Angular y en sitios web para artistas. Vas a construir la web oficial de **Mia Salazar**, una música mexicano-catalana-andaluza afincada en Hamburgo tras una década en Estocolmo.

### Contexto del proyecto

Su trabajo actual es una colección de canciones sobre **duelo migratorio y reconstrucción de identidad**, organizada en cuatro actos:

- **Acto I — La muerte**: *Mantas*
- **Acto II —** aún sin publicar
- **Acto III — La transformación**: *Ajolote*, *Despatriada*
- **Acto IV — El viaje**: *Escuchando a Dios*

Enlaces reales: Spotify (artista `1tMFF9IkixBOd42mCldDbr`), Instagram `@miasalazarofficial`, TikTok `@miasalazarmusic`.

La idea central del sitio: un **retrato fotográfico interactivo**. Al pulsar sobre distintas partes del cuerpo se abren fragmentos de su biografía. El cuerpo es el índice del contenido:

| Parte | Contenido |
|---|---|
| Ojos | Las raíces que ya no se ven: México, Andalucía, Terrassa, la infancia |
| Boca | Los cinco idiomas que habla |
| Manos | El teclado, la guitarra y los instrumentos que toca |
| Pecho | *Ajolote* — el animal que nunca completa su metamorfosis |
| Pies | El mapa de migraciones: México → Andalucía -> Terrassa → Estocolmo → Hamburgo |

### Concepto de diseño (respétalo, no lo reinventes)

El ajolote es un animal que **nunca completa su metamorfosis**: se queda en estado larval toda su vida. Es la metáfora del proyecto — alguien que no pertenece del todo a ningún sitio. Pero, según la propia artista y la prensa que la cubre, no es una metáfora de ruptura: transformarse no implica cortar lazos, sino aprender a convivir con ellos mientras se construye otra identidad. El diseño debe transmitir eso: **permanencia y mutación a la vez**, no desarraigo trágico.

**Paleta** — el fondo es siempre frío; el calor solo emerge en los elementos activos, nunca al revés:

```
--c-ink:       #10151F   fondo base, aguas heladas
--c-ink-soft:  #171F2B   fondo secundario
--c-slate:     #4A5A6B   texto de apoyo, líneas
--c-terracota: #B8543A   raíz mexicana-andaluza (bordes y acentos, NO texto)
--c-ajolote:   #E3919C   acento emocional, hotspots
--c-hueso:     #EDE6DD   texto principal
```

**Tipografía**: Fraunces (serif cálida, con itálicas expresivas) para títulos y letras de canciones; Inter (sans fría, geométrica) para UI y textos. Esa tensión entre serif mediterránea y sans nórdica *es* el argumento visual del sitio.

**Elemento firma**: finos filamentos SVG que conectan los hotspots entre sí y se iluminan al pasar el cursor, como las branquias ramificadas del ajolote. Es el único sitio donde el diseño se permite ser llamativo; todo lo demás debe permanecer sobrio.

### Stack obligatorio

- **Angular** con componentes standalone y signals (sin NgModules)
- **SCSS** con custom properties para los tokens (sin Tailwind ni Bootstrap)
- `@angular/animations` para transiciones (sin GSAP ni Framer Motion)
- `@angular/cdk` solo para `FocusTrap` y utilidades de accesibilidad
- **Sin backend**: el contenido vive en archivos TypeScript tipados en `src/app/data/`
- **Sitio bilingüe (español e inglés)**: NO uses el i18n nativo de Angular (`@angular/localize`), genera builds duplicados innecesarios para este proyecto. Implementa un `LocaleService` propio con signals y prefijo de idioma en la ruta (`/es/`, `/en/`). El contenido de cada idioma vive duplicado en `data/es/` y `data/en/`, implementando la misma interfaz. Lo que no se traduce (IDs de Spotify/YouTube, fechas) va en un archivo compartido
- Despliegue en **GitHub Pages** mediante GitHub Actions

### Requisitos no negociables

**Accesibilidad**
- Los hotspots son elementos `<button>` reales, nunca divs con click
- Área táctil mínima 44×44px aunque el punto visible sea pequeño
- El popup lleva focus trap; al cerrarse, el foco vuelve al hotspot que lo abrió
- `Escape` y click en el fondo cierran el popup
- El retrato interactivo tiene **siempre** una lista alternativa navegable debajo, para móvil y para quien no pueda usar los hotspots con precisión
- `prefers-reduced-motion: reduce` respetado en todas las animaciones
- Contraste AA mínimo. El terracota `#B8543A` sobre fondo oscuro no llega para texto de párrafo: úsalo solo en bordes y acentos

**Rendimiento**
- Presupuesto: menos de 1MB en la carga inicial
- Imágenes en AVIF con fallback WebP, `srcset` a 640/1024/1600px, `width` y `height` explícitos siempre
- Fuentes self-hosted en `assets/fonts/`, nunca desde Google Fonts (rendimiento + RGPD)
- Los embeds de Spotify y YouTube **no cargan hasta que el visitante pulsa**: muestra la portada como placeholder y sustitúyela por el iframe al hacer clic

**Datos**
- Todo el contenido tipado con interfaces. Añadir una canción debe ser editar un archivo de datos, sin tocar componentes
- Guarda IDs sueltos de Spotify/YouTube, nunca URLs completas de embed
- El Acto II se renderiza en estado "pendiente" a partir de un flag `publicado: false`; no lo omitas ni comentes el código
- Un enlace compartido a `/#/en/actos` debe abrir siempre en inglés, sea cual sea el idioma del navegador de quien lo abra. El `LocaleService` solo decide el idioma por defecto cuando no hay prefijo en la URL

**Accesibilidad e idioma**
- El atributo `lang` de `<html>` se actualiza dinámicamente según el idioma activo, nunca queda fijado en `"es"`
- El selector de idioma (ES / EN) va siempre visible en la cabecera, nunca escondido en un menú

**Posicionamiento del retrato**
- Las posiciones de los hotspots van en **porcentajes**, definidas en el archivo de datos, no hardcodeadas en el CSS
- Las coordenadas de los filamentos SVG se **calculan** a partir de esas mismas posiciones; no las escribas dos veces

### Cómo quiero que trabajes

1. Antes de escribir código, dime **qué vas a construir y en qué orden**, y espera mi confirmación.
2. Trabaja por fases, no de golpe. Empieza por el esqueleto y el despliegue funcionando; el retrato interactivo va después.
3. Cuando una decisión técnica tenga alternativas reales (routing con hash o con `404.html`, por ejemplo), **explícame el trade-off y pregúntame** en vez de elegir por tu cuenta.
4. Verifica las versiones actuales de Angular y de las GitHub Actions antes de fijarlas en `package.json` o en el workflow; no des por buenas las que traigas de memoria.
5. Si algo del brief te parece una mala idea, dímelo. Prefiero una discusión a un sí automático.
6. No añadas dependencias que no estén en el stack sin justificarlas primero.
7. No inventes contenido biográfico. Si falta un texto, déjalo marcado como `TODO` y dime qué necesitas.

### Empieza por

**Fase 1**: crea el proyecto Angular, monta el sistema de tokens en `styles/_tokens.scss`, configura el workflow de despliegue a GitHub Pages y déjalo desplegando correctamente aunque la página aún esté vacía. Confírmame el `--base-href` que debo usar según si habrá dominio propio o no.

---

## Prompts de seguimiento

Una vez completada cada fase, usa estos:

**Fase 2 — Retrato**
> Construye `RetratoComponent` y `PopupComponent`. El retrato: foto con tratamiento duotono (desaturación + degradado frío/terracota con `mix-blend-mode: color`), hotspots posicionados desde `hotspots.data.ts`, filamentos SVG calculados a partir de esas coordenadas. El popup: accesible según los requisitos, animación de apertura desde el punto de contacto en vez de un modal centrado genérico. Incluye la lista alternativa para móvil.

**Fase 3 — Actos y música**
> Construye `ActosComponent` con los cuatro actos y `LazyMediaComponent` para los embeds diferidos de Spotify y YouTube. El Acto II en estado pendiente. Los datos desde `actos.data.ts` y `canciones.data.ts`.

**Fase 4 — Galería**
> Añade la sección de fotografías y contenido audiovisual, con imágenes responsive optimizadas y carga diferida. Incluye el script de `/scripts` que genera las variantes AVIF/WebP con sharp.

**Fase 5 — Pulido**
> Pasa una auditoría Lighthouse y de accesibilidad. Añade las metaetiquetas Open Graph y el JSON-LD de tipo MusicGroup en `index.html`. Dame la lista de lo que falla y arréglalo por orden de impacto.

---

## Estado (actualizado durante la ejecución, no forma parte del brief original)

**Fases 1 y 2 completadas.** Detalle real de lo construido y las decisiones tomadas en el camino: ver `arquitectura.md` (secciones 2, 3, 9, 12 y 13 se han ido actualizando a medida que se avanzaba, en vez de mantener este archivo como brief congelado).

Decisiones confirmadas que no estaban cerradas en el brief original:
- Routing: hash (`withHashLocation()`), no `404.html`.
- Sin dominio propio por ahora → `--base-href=/miasalazar/`. Cuando haya dominio, cambiar a `/`.
- Angular zoneless (no zone.js) — encaja con un stack 100% signals.
- Los cinco idiomas de Mia (para el hotspot de "boca"): español, catalán, inglés, sueco, alemán.
- Mientras no se abran PRs a `main`, el despliegue también dispara desde la rama de trabajo (ver nota en `arquitectura.md` §9) — hay que revertir esto cuando se retome el flujo normal de PRs.

Pendiente de Mia, sin lo cual no se puede avanzar el contenido (no inventado, ver regla 7): historia de "ojos" (raíces/infancia), detalle de instrumentos en "manos", fechas del mapa en "pies", foto definitiva del retrato (se usa una placeholder de busto que no incluye pies y deja las manos en sombra).

---