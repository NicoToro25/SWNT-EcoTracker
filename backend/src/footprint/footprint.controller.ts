import { Body, Controller, Post } from '@nestjs/common';
import { FootprintService } from './footprint.service';
import { CalculateFootprintDto } from './dto/calculate-footprint.dto';
import { FootprintResponseDto } from './dto/footprint-response.dto';

@Controller('footprint')
export class FootprintController {
  constructor(private readonly footprintService: FootprintService) {}

  /**
   * Calcula la huella de carbono estimada a partir de una descripción
   * en lenguaje natural de las actividades del día.
   * Accesible en: /footprint/calculate (producción) y /api/footprint/calculate (desarrollo)
   */
  @Post('calculate')
  calculate(@Body() dto: CalculateFootprintDto): FootprintResponseDto {
    const { totalKgCo2, breakdown } = this.footprintService.calculateFromDescription(dto.description);
    return new FootprintResponseDto(totalKgCo2, breakdown);
  }
}

@Controller('api/footprint')
export class FootprintApiController {
  constructor(private readonly footprintService: FootprintService) {}

  /**
   * Alias para desarrollo (cuando se usa el proxy de Vite)
   */
  @Post('calculate')
  calculate(@Body() dto: CalculateFootprintDto): FootprintResponseDto {
    const { totalKgCo2, breakdown } = this.footprintService.calculateFromDescription(dto.description);
    return new FootprintResponseDto(totalKgCo2, breakdown);
  }
}
