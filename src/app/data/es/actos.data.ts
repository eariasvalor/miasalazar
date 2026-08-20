import { Acto } from '../../core/models/acto.model';

/**
 * Títulos y canciones confirmados por el brief. Las descripciones largas
 * de cada acto (salvo el III, que ya viene descrito en el concepto del
 * ajolote) siguen en TODO — no las invento.
 */
export const ACTOS_ES: Acto[] = [
  {
    numero: 1,
    titulo: 'La muerte',
    publicado: true,
    descripcion: 'TODO: descripción del Acto I.',
    cancionIds: ['mantas'],
  },
  {
    numero: 2,
    titulo: 'Próximamente',
    publicado: false,
    descripcion: 'Aún sin publicar.',
    cancionIds: [],
  },
  {
    numero: 3,
    titulo: 'La transformación',
    publicado: true,
    descripcion:
      'El ajolote nunca completa su metamorfosis: permanece y muta a la vez. No es una historia de ruptura, sino de convivir con lo que ya se es mientras se construye otra identidad.',
    cancionIds: ['ajolote', 'despatriada'],
  },
  {
    numero: 4,
    titulo: 'El viaje',
    publicado: true,
    descripcion: 'TODO: descripción del Acto IV.',
    cancionIds: ['escuchando-a-dios'],
  },
];
