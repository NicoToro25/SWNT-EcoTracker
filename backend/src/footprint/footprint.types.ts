/** Resultado del cálculo: total y desglose por actividad */
export interface FootprintResult {
  totalKgCo2: number;
  breakdown: { label: string; kgCo2: number }[];
}
