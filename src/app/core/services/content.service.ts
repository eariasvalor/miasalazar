import { Injectable, computed, inject } from '@angular/core';
import { ACTOS_EN } from '../../data/en/actos.data';
import { HOTSPOTS_EN } from '../../data/en/hotspots.data';
import { ACTOS_ES } from '../../data/es/actos.data';
import { HOTSPOTS_ES } from '../../data/es/hotspots.data';
import { CANCIONES } from '../../data/canciones.data';
import { LocaleService } from './locale.service';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly locale = inject(LocaleService);

  readonly hotspots = computed(() => (this.locale.locale() === 'en' ? HOTSPOTS_EN : HOTSPOTS_ES));
  readonly actos = computed(() => (this.locale.locale() === 'en' ? ACTOS_EN : ACTOS_ES));
  readonly canciones = CANCIONES;
}
