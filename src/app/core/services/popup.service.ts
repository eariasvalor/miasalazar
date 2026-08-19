import { Injectable, signal } from '@angular/core';
import { Hotspot } from '../models/hotspot.model';

export interface PuntoOrigen {
  x: number;
  y: number;
}

@Injectable({ providedIn: 'root' })
export class PopupService {
  private readonly _hotspotActivo = signal<Hotspot | null>(null);
  private readonly _origen = signal<PuntoOrigen | null>(null);
  private disparador: HTMLElement | null = null;

  readonly hotspotActivo = this._hotspotActivo.asReadonly();
  readonly origen = this._origen.asReadonly();

  abrir(hotspot: Hotspot, disparador: HTMLElement): void {
    this.disparador = disparador;
    const rect = disparador.getBoundingClientRect();
    this._origen.set({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    this._hotspotActivo.set(hotspot);
  }

  cerrar(): void {
    this._hotspotActivo.set(null);
    this.disparador?.focus();
    this.disparador = null;
  }
}
