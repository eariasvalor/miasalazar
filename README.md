# Mia Salazar — sitio web

Sitio de presentación de Mia Salazar (música, productora, multiinstrumentista y cineasta), construido con Angular (standalone + signals) y desplegado en GitHub Pages.

Documentación del proyecto:

- [`arquitectura.md`](./arquitectura.md) — decisiones técnicas, estructura de carpetas, modelo de datos.
- [`prompt.md`](./prompt.md) — brief de diseño y contenido, fase a fase.

## Desarrollo local

```bash
npm ci
npm start        # http://localhost:4200
```

## Build de producción

```bash
npm run build -- --base-href=/miasalazar/
```

Genera los artefactos en `dist/mia-salazar-web/browser`. El `--base-href` cambiará a `/` el día que el sitio tenga dominio propio (ver §9 de `arquitectura.md`).

## Tests

```bash
npm test
```

Usa [Vitest](https://vitest.dev/) como test runner.

## Despliegue

El workflow `.github/workflows/deploy.yml` construye y despliega a GitHub Pages en cada push a `main` (Settings → Pages → Source: GitHub Actions).

---

_Generado inicialmente con [Angular CLI](https://github.com/angular/angular-cli) 22.1.4._
