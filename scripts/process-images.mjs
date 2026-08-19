#!/usr/bin/env node
// Genera variantes AVIF + WebP en varios anchos a partir de una imagen fuente.
// Uso: node scripts/process-images.mjs <origen> <directorio-salida> <nombre-base> [anchos separados por coma]
//
// Ejemplo:
//   node scripts/process-images.mjs assets-source/retrato/mia-retrato-original.png \
//     src/assets/img/retrato mia-retrato 640,1024,1600
//
// El original se guarda en assets-source/ (fuera del árbol de build de Angular)
// para poder reprocesar con otros anchos o recortes sin volver a pedirlo.
//
// Las imágenes originales se procesan aquí, antes de commitear (arquitectura.md §7),
// no en tiempo de build.

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const [, , origen, dirSalida, nombreBase, anchosArg] = process.argv;

if (!origen || !dirSalida || !nombreBase) {
  console.error(
    'Uso: node scripts/process-images.mjs <origen> <directorio-salida> <nombre-base> [anchos]',
  );
  process.exit(1);
}

const anchosPedidos = (anchosArg ?? '640,1024,1600').split(',').map(Number);

async function main() {
  await mkdir(dirSalida, { recursive: true });

  const metadata = await sharp(origen).metadata();
  const anchoFuente = metadata.width ?? Math.max(...anchosPedidos);

  // Nunca se hace upscaling: se descartan anchos mayores que la imagen fuente
  // y, si todos lo son, se genera al menos una variante al ancho nativo.
  const anchos = [...new Set(anchosPedidos.filter((w) => w <= anchoFuente))];
  if (anchos.length === 0) anchos.push(anchoFuente);

  for (const ancho of anchos) {
    const base = sharp(origen).resize({ width: ancho, withoutEnlargement: true });

    const avifPath = path.join(dirSalida, `${nombreBase}-${ancho}.avif`);
    const webpPath = path.join(dirSalida, `${nombreBase}-${ancho}.webp`);

    await base.clone().avif({ quality: 55 }).toFile(avifPath);
    await base.clone().webp({ quality: 78 }).toFile(webpPath);

    console.log(`✓ ${ancho}px → ${avifPath}, ${webpPath}`);
  }

  if (anchoFuente < Math.max(...anchosPedidos)) {
    console.warn(
      `Aviso: la imagen fuente mide ${anchoFuente}px de ancho, por debajo de algún ancho pedido (${anchosPedidos.join(', ')}). No se ha hecho upscaling.`,
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
