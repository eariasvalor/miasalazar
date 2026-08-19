import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocaleService } from '../services/locale.service';

/**
 * Sincroniza el :lang de la URL con el LocaleService.
 * Un :lang inválido (ni 'es' ni 'en') redirige al idioma detectado,
 * para que un enlace mal escrito nunca deje la app en un estado sin idioma.
 */
export const langGuard: CanActivateFn = (route) => {
  const locale = inject(LocaleService);
  const router = inject(Router);
  const lang = route.paramMap.get('lang');

  if (!locale.esLocale(lang)) {
    return router.parseUrl(`/${locale.locale()}`);
  }

  if (locale.locale() !== lang) {
    locale.cambiar(lang);
  }

  return true;
};
