import { Component, computed, inject, input, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Cancion } from '../../core/models/cancion.model';

@Component({
  selector: 'app-lazy-media',
  templateUrl: './lazy-media.component.html',
  styleUrl: './lazy-media.component.scss',
})
export class LazyMediaComponent {
  readonly cancion = input.required<Cancion>();
  readonly etiquetaReproducir = input('Reproducir en Spotify');

  private readonly sanitizer = inject(DomSanitizer);
  private readonly cargado = signal(false);
  protected readonly mostrarEmbed = this.cargado.asReadonly();

  protected readonly embedUrl = computed<SafeResourceUrl | null>(() => {
    const id = this.cancion().spotifyTrackId;
    if (!this.cargado() || !id) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://open.spotify.com/embed/track/${id}?utm_source=generator`,
    );
  });

  protected cargar(): void {
    this.cargado.set(true);
  }
}
