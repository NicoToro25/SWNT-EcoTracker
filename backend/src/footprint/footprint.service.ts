import { Injectable } from '@nestjs/common';
import { ACTIVITY_DETECTORS } from './detectors';
import type { FootprintResult } from './footprint.types';

@Injectable()
export class FootprintService {
  /**
   * Estima la huella de carbono a partir de una descripción en lenguaje natural.
   * Ejecuta todos los detectores de actividades y suma las emisiones.
   */
  calculateFromDescription(description: string): FootprintResult {
    const text = description.toLowerCase().trim();
    const breakdown: { label: string; kgCo2: number }[] = [];

    for (const detect of ACTIVITY_DETECTORS) {
      const items = detect(text);
      for (const item of items) {
        breakdown.push({ label: item.label, kgCo2: this.round(item.kgCo2) });
      }
    }

    const totalKgCo2 = this.round(breakdown.reduce((sum, item) => sum + item.kgCo2, 0));
    return { totalKgCo2, breakdown };
  }

  private round(n: number): number {
    return Math.round(n * 100) / 100;
  }
}
