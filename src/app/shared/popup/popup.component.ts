import { CdkTrapFocus } from '@angular/cdk/a11y';
import { DOCUMENT, Component, HostListener, effect, inject, signal } from '@angular/core';
import { PopupService } from '../../core/services/popup.service';

function anchoBarraScroll(document: Document): number {
  const w = document.defaultView;
  if (!w) return 0;
  return w.innerWidth - document.documentElement.clientWidth;
}

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

  // Mientras es true, el popup sigue montado pero reproduciendo la
  // animación de salida; solo al terminar (onAnimationEnd) se limpia el
  // estado real en el servicio y se devuelve el foco al hotspot.
  protected readonly saliendo = signal(false);

  constructor() {
    effect(() => {
      if (this.hotspot()) {
        // Medir el hueco de la barra de scroll ANTES de ocultarla: una vez
        // puesto overflow:hidden ya no hay diferencia que medir. En
        // sistemas con scrollbar superpuesto (no ocupa layout) esto da 0,
        // así que el padding no tiene ningún efecto ahí.
        const ancho = anchoBarraScroll(this.document);
        this.document.body.style.overflow = 'hidden';
        this.document.body.style.paddingRight = ancho > 0 ? `${ancho}px` : '';
      } else {
        this.document.body.style.overflow = '';
        this.document.body.style.paddingRight = '';
      }
    });
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.cerrar();
  }

  protected cerrar(): void {
    if (this.saliendo()) return;
    this.saliendo.set(true);
  }

  protected onAnimationEnd(): void {
    // El view encapsulation de Angular renombra los @keyframes
    // (_ngcontent-xxx_popup-out), así que no se compara por nombre: basta
    // con que el evento llegue mientras saliendo() es true, porque es la
    // única animación que corre en ese estado.
    if (this.saliendo()) {
      this.saliendo.set(false);
      this.popup.cerrar();
    }
  }
}
