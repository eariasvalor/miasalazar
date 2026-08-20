import { Cancion } from '../core/models/cancion.model';

/**
 * IDs de Spotify verificados contra los singles reales del artista
 * (spotify:artist:1tMFF9IkixBOd42mCldDbr) — no inventados.
 *
 * portadaUrl es la ruta base sin extensión ni ancho: LazyMediaComponent
 * construye el <picture> añadiendo -320/-640/-950.avif|webp, igual que el
 * retrato. Carátulas reales, procesadas con scripts/process-images.mjs a
 * partir de assets-source/canciones/.
 *
 * TODO: fechaLanzamiento — el buscador de Spotify no expone la fecha de
 * publicación, y no voy a inventarla. Necesito que Mia (o quien lleve el
 * Spotify for Artists) me pase las fechas reales de cada single.
 */
export const CANCIONES: Cancion[] = [
  {
    id: 'mantas',
    titulo: 'Mantas',
    acto: 1,
    fechaLanzamiento: 'TODO',
    spotifyTrackId: '1HIOLv8QDZGADao8pkd9Oe',
    portadaUrl: 'assets/img/canciones/mantas-portada',
  },
  {
    id: 'ajolote',
    titulo: 'Ajolote',
    acto: 3,
    fechaLanzamiento: 'TODO',
    spotifyTrackId: '49QKTqzeYL9IWNLNm5gW58',
    portadaUrl: 'assets/img/canciones/ajolote-portada',
  },
  {
    id: 'despatriada',
    titulo: 'Despatriada',
    acto: 3,
    fechaLanzamiento: 'TODO',
    spotifyTrackId: '0yD8ZisTdR0dfwltlg9wNd',
    portadaUrl: 'assets/img/canciones/despatriada-portada',
  },
  {
    id: 'escuchando-a-dios',
    titulo: 'Escuchando a Dios',
    acto: 4,
    fechaLanzamiento: 'TODO',
    spotifyTrackId: '41pfmTZVd4pxV7iFOMi1L9',
    portadaUrl: 'assets/img/canciones/escuchando-a-dios-portada',
  },
];
