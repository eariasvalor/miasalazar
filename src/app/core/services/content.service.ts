import { Injectable, computed, inject } from '@angular/core';
import { HOTSPOTS_EN } from '../../data/en/hotspots.data';
import { HOTSPOTS_ES } from '../../data/es/hotspots.data';
import { LocaleService } from './locale.service';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly locale = inject(LocaleService);

  readonly hotspots = computed(() => (this.locale.locale() === 'en' ? HOTSPOTS_EN : HOTSPOTS_ES));
}
