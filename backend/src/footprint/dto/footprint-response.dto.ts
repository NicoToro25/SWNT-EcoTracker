/**
 * Un ítem del desglose mostrado al usuario.
 */
export class FootprintBreakdownItemDto {
  /** Descripción legible del concepto (ej: "Transporte en bus (20 km)") */
  label: string;
  /** kg CO2 de este concepto */
  kgCo2: number;
}

/**
 * DTO de respuesta con la huella estimada y el desglose del cálculo.
 */
export class FootprintResponseDto {
  /** Huella de carbono total en kg CO2 equivalente */
  kgCo2: number;
  /** Desglose por categoría para mostrar antes del total */
  breakdown: FootprintBreakdownItemDto[];

  constructor(kgCo2: number, breakdown: FootprintBreakdownItemDto[]) {
    this.kgCo2 = kgCo2;
    this.breakdown = breakdown;
  }
}
