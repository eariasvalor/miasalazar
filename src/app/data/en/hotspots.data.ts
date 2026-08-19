import { Hotspot } from '../../core/models/hotspot.model';

/**
 * Same positions as data/es/hotspots.data.ts — see the note there about
 * 'manos' and 'pies' being provisional on the current placeholder photo.
 *
 * TODO: decide who translates (Mia or the team, see arquitectura.md §13) —
 * this is a draft translation, not final copy, especially for the lyric-
 * adjacent 'pecho' text where tone matters most.
 */
export const HOTSPOTS_EN: Hotspot[] = [
  {
    id: 'ojos',
    posicion: { x: 49, y: 21 },
    etiquetaAccesible: 'See the roots: Mexico, Andalusia, Terrassa and childhood',
    eyebrow: 'Roots',
    titulo: 'What you no longer see',
    cuerpo:
      'TODO: text about Mexico, Andalusia, Terrassa and childhood. Need Mia to tell me what she wants to share here — not inventing biographical details.',
  },
  {
    id: 'boca',
    posicion: { x: 47, y: 28 },
    etiquetaAccesible: 'See the languages Mia speaks',
    eyebrow: 'Languages',
    titulo: 'Five languages',
    cuerpo: 'TODO: which five languages does Mia speak?',
  },
  {
    id: 'manos',
    posicion: { x: 30, y: 78 },
    etiquetaAccesible: 'See the instruments Mia plays',
    eyebrow: 'Instruments',
    titulo: 'What these hands play',
    cuerpo:
      'Keyboard, guitar and other instruments. TODO: confirm if there are more instruments or specific details worth highlighting.',
  },
  {
    id: 'pecho',
    posicion: { x: 48, y: 52 },
    etiquetaAccesible: 'See what Ajolote means',
    eyebrow: 'Ajolote',
    titulo: 'The metamorphosis that never finishes',
    cuerpo:
      'The axolotl stays in its larval state its whole life: it never completes its metamorphosis. It is not a metaphor for rupture — transforming does not mean cutting ties, but learning to live alongside them while building another identity.',
    actoRelacionado: 3,
  },
  {
    id: 'pies',
    posicion: { x: 47, y: 97 },
    etiquetaAccesible: "See Mia's migration map",
    eyebrow: 'The map',
    titulo: 'The journey',
    cuerpo:
      'Mexico → Andalusia → Terrassa → Stockholm → Hamburg. TODO: confirm if there are dates or stops you want added.',
  },
];
