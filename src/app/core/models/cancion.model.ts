export interface Cancion {
  id: string; // 'ajolote'
  titulo: string;
  acto: 1 | 2 | 3 | 4;
  fechaLanzamiento: string; // ISO
  spotifyTrackId?: string;
  youtubeId?: string;
  bandcampAlbumId?: string;
  portadaUrl: string;
  letra?: string[]; // array de versos
  /** Enlace de pre-save (Spotify for Artists / feature.fm / etc.) para
   *  canciones aún no publicadas. Su presencia, junto con la ausencia de
   *  spotifyTrackId, es lo que marca una canción como "próximo lanzamiento". */
  preSaveUrl?: string;
}
