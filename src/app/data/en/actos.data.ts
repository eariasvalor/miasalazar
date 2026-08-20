import { Acto } from '../../core/models/acto.model';

/**
 * Same structure as data/es/actos.data.ts — see the note there about
 * pending act descriptions.
 */
export const ACTOS_EN: Acto[] = [
  {
    numero: 1,
    titulo: 'Death',
    publicado: true,
    descripcion: 'TODO: Act I description.',
    cancionIds: ['mantas', 'miedo-de-quererte'],
  },
  {
    numero: 2,
    titulo: 'Coming soon',
    publicado: false,
    descripcion: 'Not published yet.',
    cancionIds: [],
  },
  {
    numero: 3,
    titulo: 'The transformation',
    publicado: true,
    descripcion:
      'The axolotl never completes its metamorphosis: it stays and mutates at once. Not a story of rupture, but of living alongside who you already are while building another identity.',
    cancionIds: ['ajolote', 'despatriada'],
  },
  {
    numero: 4,
    titulo: 'The journey',
    publicado: true,
    descripcion: 'TODO: Act IV description.',
    cancionIds: ['escuchando-a-dios'],
  },
];
