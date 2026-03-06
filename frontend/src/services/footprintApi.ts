/**
 * Cliente API para el cálculo de huella de carbono.
 * En desarrollo usa el proxy de Vite (/api -> backend en 3000).
 * En producción usa /api directamente (mismo host).
 */

const API_BASE = import.meta.env.VITE_API_URL ?? '';
const url = API_BASE ? `${API_BASE.replace(/\/$/, '')}/footprint/calculate` : '/api/footprint/calculate';

export interface CalculateFootprintRequest {
  description: string;
}

export interface FootprintBreakdownItem {
  label: string;
  kgCo2: number;
}

export interface FootprintResponse {
  kgCo2: number;
  breakdown: FootprintBreakdownItem[];
}

/**
 * Envía la descripción del día al backend y devuelve la huella estimada en kg CO2.
 */
export async function calculateFootprint(
  description: string
): Promise<FootprintResponse> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description } as CalculateFootprintRequest),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message ?? 'Error al calcular la huella');
  }

  return res.json() as Promise<FootprintResponse>;
}
