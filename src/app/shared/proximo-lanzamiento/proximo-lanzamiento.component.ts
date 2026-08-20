import { Component, DestroyRef, computed, effect, inject, input, signal } from '@angular/core';
import { Cancion } from '../../core/models/cancion.model';

interface Restante {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

function calcularRestante(objetivo: Date): Restante {
  const ms = Math.max(0, objetivo.getTime() - Date.now());
  const segundosTotales = Math.floor(ms / 1000);
  return {
    dias: Math.floor(segundosTotales / 86400),
    horas: Math.floor((segundosTotales % 86400) / 3600),
    minutos: Math.floor((segundosTotales % 3600) / 60),
    segundos: segundosTotales % 60,
  };
}

@Component({
  selector: 'app-proximo-lanzamiento',
  templateUrl: './proximo-lanzamiento.component.html',
  styleUrl: './proximo-lanzamiento.component.scss',
})
export class ProximoLanzamientoComponent {
  readonly cancion = input.required<Cancion>();

  private readonly objetivo = computed(() => new Date(this.cancion().fechaLanzamiento));
  protected readonly restante = signal<Restante>({ dias: 0, horas: 0, minutos: 0, segundos: 0 });

  // DatePipe con un huso horario da NaN con nombres IANA ('Europe/Berlin') y
  // cae en silencio al huso del navegador — con el ISO ya trae el offset
  // correcto (+02:00), así que se extrae directo del string en vez de pasar
  // por conversión de zona horaria.
  protected readonly fechaFormateada = computed(() => {
    const iso = this.cancion().fechaLanzamiento;
    const [, anio, mes, dia] = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso) ?? [];
    return anio ? `${dia}/${mes}/${anio}` : iso;
  });

  constructor() {
    let intervalId: ReturnType<typeof setInterval> | undefined;

    // effect() (no el constructor a secas) porque los input.required() no
    // están disponibles todavía cuando el constructor se ejecuta — leerlos
    // antes de tiempo lanza NG0950.
    effect(() => {
      const objetivo = this.objetivo();
      this.restante.set(calcularRestante(objetivo));
      clearInterval(intervalId);
      intervalId = setInterval(() => this.restante.set(calcularRestante(objetivo)), 1000);
    });

    inject(DestroyRef).onDestroy(() => clearInterval(intervalId));
  }

  protected dosDigitos(n: number): string {
    return n.toString().padStart(2, '0');
  }
}
