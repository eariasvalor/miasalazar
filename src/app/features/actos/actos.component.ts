import { Component, computed, inject } from '@angular/core';
import { ContentService } from '../../core/services/content.service';
import { LazyMediaComponent } from '../../shared/lazy-media/lazy-media.component';
import { ProximoLanzamientoComponent } from '../../shared/proximo-lanzamiento/proximo-lanzamiento.component';

@Component({
  selector: 'app-actos',
  imports: [LazyMediaComponent, ProximoLanzamientoComponent],
  templateUrl: './actos.component.html',
  styleUrl: './actos.component.scss',
})
export class ActosComponent {
  private readonly content = inject(ContentService);

  protected readonly actos = this.content.actos;

  protected readonly cancionesPorActo = computed(() => {
    const canciones = this.content.canciones;
    const mapa = new Map(canciones.map((c) => [c.id, c]));
    return new Map(
      this.actos().map((acto) => [
        acto.numero,
        acto.cancionIds.map((id) => mapa.get(id)).filter((c) => !!c),
      ]),
    );
  });
}
