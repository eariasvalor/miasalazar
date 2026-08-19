import { Hotspot } from '../../core/models/hotspot.model';

/**
 * Posiciones calculadas sobre la foto placeholder actual
 * (src/assets/img/retrato/mia-retrato-*). Es un encuadre de busto: los ojos,
 * la boca y el pecho tienen un punto de anclaje claro, pero la foto no llega
 * a mostrar los pies y las manos quedan parcialmente en sombra junto a la
 * cadera. 'manos' y 'pies' son posiciones provisionales — hay que reajustarlas
 * en cuanto se suba la foto definitiva (idealmente de cuerpo entero o al menos
 * hasta las manos).
 */
export const HOTSPOTS_ES: Hotspot[] = [
  {
    id: 'ojos',
    posicion: { x: 49, y: 21 },
    etiquetaAccesible: 'Ver las raíces: México, Andalucía, Terrassa y la infancia',
    eyebrow: 'Raíces',
    titulo: 'Lo que ya no se ve',
    cuerpo:
      'TODO: texto sobre México, Andalucía, Terrassa y la infancia. Necesito que Mia me cuente qué quiere compartir aquí — no voy a inventar detalles biográficos.',
  },
  {
    id: 'boca',
    posicion: { x: 47, y: 28 },
    etiquetaAccesible: 'Ver los idiomas que habla Mia',
    eyebrow: 'Idiomas',
    titulo: 'Lo que hablo',
    cuerpo: '¡Hola! · Hola! · Hello! · Hej! · Hallo!',
  },
  {
    id: 'manos',
    posicion: { x: 30, y: 78 },
    etiquetaAccesible: 'Ver los instrumentos que toca Mia',
    eyebrow: 'Instrumentos',
    titulo: 'Lo que tocan mis manos',
    cuerpo:
      'Teclado, guitarra y otros instrumentos. TODO: confirmar si hay más instrumentos o algún detalle concreto que quieras destacar.',
  },
  {
    id: 'pecho',
    posicion: { x: 48, y: 52 },
    etiquetaAccesible: 'Ver el significado de Ajolote',
    eyebrow: 'Ajolote',
    titulo: 'La metamorfosis que nunca termina',
    cuerpo:
      'El ajolote se queda en estado larval toda su vida: nunca completa su metamorfosis. No es una metáfora de ruptura — transformarse no implica cortar lazos, sino aprender a convivir con ellos mientras se construye otra identidad.',
    actoRelacionado: 3,
  },
  {
    id: 'pies',
    posicion: { x: 47, y: 97 },
    etiquetaAccesible: 'Ver el mapa de migraciones de Mia',
    eyebrow: 'El mapa',
    titulo: 'El viaje',
    cuerpo:
      'México → Andalucía → Terrassa → Estocolmo → Hamburgo. TODO: confirmar si hay fechas o paradas que quieras añadir.',
  },
];
