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
   */
  @Post('calculate')
  calculate(@Body() dto: CalculateFootprintDto): FootprintResponseDto {
    const { totalKgCo2, breakdown } = this.footprintService.calculateFromDescription(dto.description);
    return new FootprintResponseDto(totalKgCo2, breakdown);
  }
}
