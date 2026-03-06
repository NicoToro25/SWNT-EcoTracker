import { FootprintService } from './footprint.service';
import { CalculateFootprintDto } from './dto/calculate-footprint.dto';
import { FootprintResponseDto } from './dto/footprint-response.dto';
export declare class FootprintController {
    private readonly footprintService;
    constructor(footprintService: FootprintService);
    calculate(dto: CalculateFootprintDto): FootprintResponseDto;
}
