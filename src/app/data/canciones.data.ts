import { Cancion } from '../core/models/cancion.model';

/**
 * IDs de Spotify verificados contra los singles reales del artista
 * (spotify:artist:1tMFF9IkixBOd42mCldDbr) — no inventados.
 *
 * TODO: fechaLanzamiento — el buscador de Spotify no expone la fecha de
 * publicación, y no voy a inventarla. Necesito que Mia (o quien lleve el
 * Spotify for Artists) me pase las fechas reales de cada single.
 *
 * TODO: portadaUrl — apunta a una portada placeholder generada (gradiente +
 * título), no a la carátula real. No pude descargarla de Spotify porque el
 * dominio está bloqueado en este entorno de red. Sustituir por la carátula
 * real en cuanto se pueda.
 */
export const CANCIONES: Cancion[] = [
  {
    id: 'mantas',
    titulo: 'Mantas',
    acto: 1,
    fechaLanzamiento: 'TODO',
    spotifyTrackId: '1HIOLv8QDZGADao8pkd9Oe',
    portadaUrl: 'assets/img/canciones/mantas-portada-placeholder.svg',
  },
  {
    id: 'ajolote',
    titulo: 'Ajolote',
    acto: 3,
    fechaLanzamiento: 'TODO',
    spotifyTrackId: '49QKTqzeYL9IWNLNm5gW58',
    portadaUrl: 'assets/img/canciones/ajolote-portada-placeholder.svg',
  },
  {
    id: 'despatriada',
    titulo: 'Despatriada',
    acto: 3,
    fechaLanzamiento: 'TODO',
    spotifyTrackId: '0yD8ZisTdR0dfwltlg9wNd',
    portadaUrl: 'assets/img/canciones/despatriada-portada-placeholder.svg',
  },
  {
    id: 'escuchando-a-dios',
    titulo: 'Escuchando a Dios',
    acto: 4,
    fechaLanzamiento: 'TODO',
    spotifyTrackId: '41pfmTZVd4pxV7iFOMi1L9',
    portadaUrl: 'assets/img/canciones/escuchando-a-dios-portada-placeholder.svg',
  },
];
