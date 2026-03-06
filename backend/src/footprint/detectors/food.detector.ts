import { EMISSION_FACTORS } from '../constants/emission-factors';
import type { ActivityDetector } from './types';

/**
 * Detecta alimentación: carne, pollo, vegetariano.
 * Solo se cuenta cuando aparece la palabra del alimento (no solo "comí").
 */
export const detectFood: ActivityDetector = (text) => {
  const items: { label: string; kgCo2: number }[] = [];

  // Vegetariano / vegano
  if (/\b(vegetariano|vegano|vegetales|ensalada|verdura)\b/i.test(text)) {
    items.push({ label: 'Comida vegetariana', kgCo2: EMISSION_FACTORS.FOOD_VEGETARIAN });
  }

  // Pollo / ave
  if (/\b(pollo|ave|pechuga)\b/i.test(text)) {
    items.push({ label: 'Comida con pollo', kgCo2: EMISSION_FACTORS.FOOD_CHICKEN });
  }

  // Carne de res / cerdo / cordero
  if (/\b(carne|res|cerdo|cordero|vacío|bife)\b/i.test(text)) {
    items.push({ label: 'Comida con carne (res/cerdo)', kgCo2: EMISSION_FACTORS.FOOD_MEAT });
  }

  return items;
};
