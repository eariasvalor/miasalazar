export type ParteCuerpo = 'ojos' | 'boca' | 'manos' | 'pecho' | 'pies';

export interface Hotspot {
  id: ParteCuerpo;
  /** Posición en % sobre el contenedor del retrato */
  posicion: { x: number; y: number };
  /** Texto del aria-label: describe el destino, no la parte del cuerpo */
  etiquetaAccesible: string;
  eyebrow: string;
  titulo: string;
  cuerpo: string;
  /** Cita de letra, opcional */
  letra?: string;
  /** Conecta el hotspot con un acto, para colorear el filamento en el futuro */
  actoRelacionado?: number;
}
