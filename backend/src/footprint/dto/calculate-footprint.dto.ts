import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

/**
 * DTO de entrada para calcular la huella de carbono.
 * Recibe la descripción en lenguaje natural de las actividades del día.
 */
export class CalculateFootprintDto {
  @IsString()
  @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
  @MaxLength(2000, { message: 'La descripción no puede superar 2000 caracteres' })
  description: string;
}
