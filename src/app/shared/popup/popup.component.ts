import { CdkTrapFocus } from '@angular/cdk/a11y';
import { DOCUMENT, Component, HostListener, effect, inject } from '@angular/core';
import { PopupService } from '../../core/services/popup.service';

@Component({
  selector: 'app-popup',
  imports: [CdkTrapFocus],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class PopupComponent {
  private readonly popup = inject(PopupService);
  private readonly document = inject(DOCUMENT);

  protected readonly hotspot = this.popup.hotspotActivo;
  protected readonly origen = this.popup.origen;

  constructor() {
    effect(() => {
      this.document.body.style.overflow = this.hotspot() ? 'hidden' : '';
    });
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.cerrar();
  }

  protected cerrar(): void {
    this.popup.cerrar();
  }
}
