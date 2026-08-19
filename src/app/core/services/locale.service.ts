import { Injectable, signal } from '@angular/core';
import { DEFAULT_LOCALE, Locale, LOCALES } from '../models/locale.model';

const STORAGE_KEY = 'ms-locale';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private readonly _locale = signal<Locale>(this.detectarInicial());
  readonly locale = this._locale.asReadonly();

  cambiar(locale: Locale): void {
    this._locale.set(locale);
    localStorage.setItem(STORAGE_KEY, locale);
  }

  private detectarInicial(): Locale {
    const guardado = localStorage.getItem(STORAGE_KEY);
    if (this.esLocale(guardado)) return guardado;
    return navigator.language.startsWith('en') ? 'en' : DEFAULT_LOCALE;
  }

  esLocale(valor: string | null): valor is Locale {
    return LOCALES.includes(valor as Locale);
  }
}
