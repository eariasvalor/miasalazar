import { Component, DOCUMENT, effect, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LocaleService } from './core/services/locale.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {
  private readonly document = inject(DOCUMENT);
  protected readonly locale = inject(LocaleService).locale;

  constructor() {
    effect(() => {
      this.document.documentElement.lang = this.locale();
    });
  }
}
