/**
 * Un ítem del desglose: descripción legible y kg CO2.
 */
export interface BreakdownItem {
  label: string;
  kgCo2: number;
}

/**
 * Un detector de actividades: analiza el texto y devuelve ítems de desglose.
 * Cada detector es independiente y puede devolver 0, 1 o más ítems.
 */
export type ActivityDetector = (text: string) => BreakdownItem[];
