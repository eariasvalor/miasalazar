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
}
