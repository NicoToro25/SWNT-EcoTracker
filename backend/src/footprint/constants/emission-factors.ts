/**
 * Factores de emisión en kg CO2 por actividad.
 * Centralizados para facilitar cambios y ampliación.
 */

export const EMISSION_FACTORS = {
  // Alimentación (kg CO2 por mención/porción estimada)
  FOOD_MEAT: 5,
  FOOD_CHICKEN: 3,
  FOOD_VEGETARIAN: 1,

  // Transporte (kg CO2 por km)
  TRANSPORT_BUS: 0.1,
  TRANSPORT_CAR: 0.2,
  TRANSPORT_PLANE: 0.5,
  TRANSPORT_BIKE: 0,
  TRANSPORT_WALK: 0,
} as const;
