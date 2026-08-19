import { Component, computed, inject } from '@angular/core';
import { ContentService } from '../../core/services/content.service';
import { PopupService } from '../../core/services/popup.service';
import { PopupComponent } from '../../shared/popup/popup.component';

interface Filamento {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

@Component({
  selector: 'app-retrato',
  imports: [PopupComponent],
  templateUrl: './retrato.component.html',
  styleUrl: './retrato.component.scss',
})
export class RetratoComponent {
  private readonly content = inject(ContentService);
  private readonly popup = inject(PopupService);

  protected readonly hotspots = this.content.hotspots;

  /**
   * Un filamento por hotspot, desde el centroide de todos los puntos hasta
   * cada uno — como ramas que salen de un mismo tronco (las branquias del
   * ajolote), calculadas a partir de las mismas posiciones de los hotspots,
   * nunca escritas a mano.
   */
  protected readonly filamentos = computed<Filamento[]>(() => {
    const puntos = this.hotspots();
    if (puntos.length === 0) return [];

    const centro = {
      x: puntos.reduce((suma, p) => suma + p.posicion.x, 0) / puntos.length,
      y: puntos.reduce((suma, p) => suma + p.posicion.y, 0) / puntos.length,
    };

    return puntos.map((p) => ({
      id: p.id,
      x1: centro.x,
      y1: centro.y,
      x2: p.posicion.x,
      y2: p.posicion.y,
    }));
  });

  protected abrir(hotspotId: string, evento: Event): void {
    const hotspot = this.hotspots().find((h) => h.id === hotspotId);
    if (!hotspot) return;
    this.popup.abrir(hotspot, evento.currentTarget as HTMLElement);
  }
}
