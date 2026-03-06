import { EMISSION_FACTORS } from '../constants/emission-factors';
import type { ActivityDetector } from './types';

/** Parsea número con coma o punto decimal */
function parseKm(s: string): number {
  return parseFloat(s.replace(',', '.')) || 0;
}

/** Suma todos los km que coinciden con el patrón (grupo 1 = número) */
function sumKm(text: string, pattern: RegExp): number {
  let sum = 0;
  const re = new RegExp(pattern.source, pattern.flags);
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) sum += parseKm(m[1]);
  return sum;
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Detecta transporte: bus, carro, avión, bicicleta, caminar.
 * Usa patrones "X km en [medio]" y suma múltiples ocurrencias.
 */
export const detectTransport: ActivityDetector = (text) => {
  const items: { label: string; kgCo2: number }[] = [];

  // Bus / transporte público: "20 km en bus", "tomé el bus 15 km", "tomar bus 10 km"
  let busKm = sumKm(
    text,
    /(\d+(?:[.,]\d+)?)\s*kms?\s*(?:en\s*)?(?:bus|autobús|autobus|colectivo|transporte\s*público)/gi,
  );
  if (busKm === 0) busKm = sumKm(text, /(?:tomé|tomar|agarré|tomando)\s*(?:el\s*)?(?:bus|autobús|autobus|colectivo)\s*[^\d]*?(\d+(?:[.,]\d+)?)\s*kms?/gi);
  if (busKm === 0) busKm = sumKm(text, /(\d+(?:[.,]\d+)?)\s*kms?\s*(?:en\s*)?(?:tomando\s*)?(?:el\s*)?(?:bus|autobús|autobus)/gi);
  if (busKm > 0) {
    items.push({
      label: `Transporte en bus (${busKm} km)`,
      kgCo2: round(busKm * EMISSION_FACTORS.TRANSPORT_BUS),
    });
  }

  // Carro / coche / auto / manejar: "10 km en carro", "manejé 10 km", "manejar 5 km"
  let carKm = sumKm(
    text,
    /(\d+(?:[.,]\d+)?)\s*kms?\s*(?:en\s*)?(?:carro|coche|auto|automóvil|automovil|camión|camion)/gi,
  );
  if (carKm === 0) carKm = sumKm(text, /(?:manejé|manejar|manejo|conduje|conducir|manejando)\s*[^\d]*?(\d+(?:[.,]\d+)?)\s*kms?/gi);
  if (carKm === 0) carKm = sumKm(text, /(\d+(?:[.,]\d+)?)\s*kms?\s*(?:manejando|en\s*carro)/gi);
  if (carKm > 0) {
    items.push({
      label: `Transporte en carro (${carKm} km)`,
      kgCo2: round(carKm * EMISSION_FACTORS.TRANSPORT_CAR),
    });
  }

  // Avión: "100 km en avión", "en avión 100 km", "volé 500 km", "volar 100 km"
  let planeKm = sumKm(text, /(\d+(?:[.,]\d+)?)\s*kms?\s*(?:en\s*)?(?:avión|avion|vuelo)/gi);
  if (planeKm === 0) planeKm = sumKm(text, /(?:avión|avion|vuelo)\s*[^\d]*?(\d+(?:[.,]\d+)?)\s*kms?/gi);
  if (planeKm === 0) planeKm = sumKm(text, /(?:volé|volar|volamos|volando)\s*[^\d]*?(\d+(?:[.,]\d+)?)\s*kms?/gi);
  if (planeKm === 0) planeKm = sumKm(text, /(\d+(?:[.,]\d+)?)\s*kms?\s*(?:volando|en\s*avión)/gi);
  if (planeKm > 0) {
    items.push({
      label: `Viaje en avión (${planeKm} km)`,
      kgCo2: round(planeKm * EMISSION_FACTORS.TRANSPORT_PLANE),
    });
  }
  // "Viajé en avión" / "volé" sin km
  if (planeKm === 0 && /\b(avión|avion|vuelo|volé|volar|volamos)\b/i.test(text)) {
    items.push({ label: 'Viaje en avión (sin km indicados)', kgCo2: 0 });
  }

  // Bicicleta (siempre 0)
  const bikeKm = sumKm(text, /(\d+(?:[.,]\d+)?)\s*kms?\s*(?:en\s*)?(?:bici|bicicleta)/gi);
  if (bikeKm > 0 || /\b(bici|bicicleta)\b/i.test(text)) {
    items.push({
      label: bikeKm > 0 ? `Bicicleta (${bikeKm} km)` : 'Bicicleta',
      kgCo2: EMISSION_FACTORS.TRANSPORT_BIKE,
    });
  }

  // Caminar / a pie (siempre 0): "5 km caminando" o "caminé 5 km"
  let walkKm = sumKm(text, /(\d+(?:[.,]\d+)?)\s*kms?\s*(?:a\s*pie|caminando|caminé|caminar)/gi);
  if (walkKm === 0) walkKm = sumKm(text, /(?:caminé|caminar)\s*(\d+(?:[.,]\d+)?)\s*kms?/gi);
  if (walkKm > 0 || /\b(caminé|caminar|a pie|caminando)\b/i.test(text)) {
    items.push({
      label: walkKm > 0 ? `Caminata (${walkKm} km)` : 'Caminata',
      kgCo2: EMISSION_FACTORS.TRANSPORT_WALK,
    });
  }

  return items;
};
