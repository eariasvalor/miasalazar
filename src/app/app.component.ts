import { Component, DOCUMENT, effect, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LocaleService } from './core/services/locale.service';
import { SeoService } from './core/services/seo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {
  private readonly document = inject(DOCUMENT);
  protected readonly locale = inject(LocaleService).locale;

  // Se inyecta para que se instancie al arrancar la app: su efecto interno
  // mantiene el título y las meta OG sincronizados con el idioma activo.
  private readonly seo = inject(SeoService);

  constructor() {
    effect(() => {
      this.document.documentElement.lang = this.locale();
    });
  }
}
