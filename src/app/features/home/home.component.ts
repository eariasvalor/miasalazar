import { Component, inject } from '@angular/core';
import { LocaleService } from '../../core/services/locale.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected readonly locale = inject(LocaleService).locale;
}
