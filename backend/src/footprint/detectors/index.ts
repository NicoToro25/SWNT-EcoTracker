/**
 * Punto de entrada de detectores de actividades.
 *
 * Para extender con nuevas actividades:
 * 1. Añadir factores en constants/emission-factors.ts si aplica.
 * 2. Crear un nuevo detector en este directorio (ej. other.detector.ts) que
 *    exporte una función (text: string) => BreakdownItem[].
 * 3. Registrar el detector en el array ACTIVITY_DETECTORS debajo.
 */
import type { ActivityDetector } from './types';
import { detectFood } from './food.detector';
import { detectTransport } from './transport.detector';

/** Lista de detectores que se ejecutan en orden sobre el texto del usuario */
export const ACTIVITY_DETECTORS: ActivityDetector[] = [detectFood, detectTransport];

export { detectFood } from './food.detector';
export { detectTransport } from './transport.detector';
export type { BreakdownItem, ActivityDetector } from './types';
