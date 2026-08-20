import { DOCUMENT, Injectable, effect, inject } from '@angular/core';
import { Locale } from '../models/locale.model';
import { LocaleService } from './locale.service';

interface CopiaSeo {
  titulo: string;
  descripcion: string;
}

// TODO: cambiar a https://miasalazar.com/ en cuanto haya dominio propio
// (arquitectura.md §9). Debe coincidir con el og:url estático de index.html.
const BASE_URL = 'https://eariasvalor.github.io/miasalazar/';

const COPIA: Record<Locale, CopiaSeo> = {
  es: {
    titulo: 'Mia Salazar — Duelo migratorio en cuatro actos',
    descripcion:
      'Mia Salazar: música, productora y multiinstrumentista de raíz mexicana y andaluza, afincada en Hamburgo. Una colección de canciones sobre duelo migratorio y reconstrucción de identidad, contada en cuatro actos.',
  },
  en: {
    titulo: 'Mia Salazar — Migratory Grief in Four Acts',
    descripcion:
      'Mia Salazar: musician, producer and multi-instrumentalist of Mexican and Andalusian roots, based in Hamburg. A song collection about migratory grief and the reconstruction of identity, told in four acts.',
  },
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly locale = inject(LocaleService);

  constructor() {
    effect(() => {
      this.actualizar(this.locale.locale());
    });
  }

  private actualizar(lang: Locale): void {
    const { titulo, descripcion } = COPIA[lang];

    this.document.title = titulo;
    this.setMeta('name', 'description', descripcion);
    this.setMeta('property', 'og:title', titulo);
    this.setMeta('property', 'og:description', descripcion);
    this.setMeta('property', 'og:url', `${BASE_URL}#/${lang}/`);
    this.setMeta('property', 'og:locale', lang === 'en' ? 'en_US' : 'es_ES');
  }

  private setMeta(attr: 'name' | 'property', valor: string, contenido: string): void {
    let tag = this.document.querySelector<HTMLMetaElement>(`meta[${attr}="${valor}"]`);
    if (!tag) {
      tag = this.document.createElement('meta');
      tag.setAttribute(attr, valor);
      this.document.head.appendChild(tag);
    }
    tag.setAttribute('content', contenido);
  }
}
