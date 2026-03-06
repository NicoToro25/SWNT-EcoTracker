import { Test, TestingModule } from '@nestjs/testing';
import { FootprintService } from './footprint.service';

describe('FootprintService', () => {
  let service: FootprintService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FootprintService],
    }).compile();

    service = module.get<FootprintService>(FootprintService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debe sumar 5 kg CO2 cuando se menciona comer carne', () => {
    const result = service.calculateFromDescription('Hoy comí carne');
    expect(result.totalKgCo2).toBe(5);
    expect(result.breakdown).toHaveLength(1);
    expect(result.breakdown[0].label).toContain('carne');
    expect(result.breakdown[0].kgCo2).toBe(5);
  });

  it('debe sumar 0.1 * km para viaje en bus', () => {
    const result = service.calculateFromDescription('Viajé 20 km en bus');
    expect(result.totalKgCo2).toBe(2);
    expect(result.breakdown).toHaveLength(1);
    expect(result.breakdown[0].label).toContain('bus');
    expect(result.breakdown[0].kgCo2).toBe(2);
  });

  it('debe combinar carne y bus correctamente', () => {
    const result = service.calculateFromDescription('Hoy comí carne y viajé 20km en bus');
    expect(result.totalKgCo2).toBe(5 + 2);
    expect(result.breakdown).toHaveLength(2);
  });

  it('debe sumar 0.2 * km para viaje en carro', () => {
    const result = service.calculateFromDescription('Fui 10 km en carro');
    expect(result.totalKgCo2).toBe(2);
    expect(result.breakdown[0].label).toContain('carro');
  });

  it('debe devolver 0 y desglose vacío para texto sin actividades reconocidas', () => {
    const result = service.calculateFromDescription('Hoy leí un libro');
    expect(result.totalKgCo2).toBe(0);
    expect(result.breakdown).toHaveLength(0);
  });

  it('debe sumar múltiples trayectos en bus', () => {
    const result = service.calculateFromDescription('Fui 20 km en bus y luego 10 km en bus');
    expect(result.totalKgCo2).toBe(3); // 30 km * 0.1
    expect(result.breakdown).toHaveLength(1);
    expect(result.breakdown[0].kgCo2).toBe(3);
    expect(result.breakdown[0].label).toContain('30');
  });

  it('detecta pollo (3 kg) y vegetariano (1 kg)', () => {
    const result = service.calculateFromDescription('Hoy comí pollo');
    expect(result.totalKgCo2).toBe(3);
    expect(result.breakdown.some((i) => i.label.includes('pollo'))).toBe(true);
    const r2 = service.calculateFromDescription('Hoy comí vegetariano');
    expect(r2.totalKgCo2).toBe(1);
    expect(r2.breakdown.some((i) => i.label.includes('vegetariana'))).toBe(true);
  });

  it('detecta avión (0.5 por km), bicicleta y caminar (0)', () => {
    const result = service.calculateFromDescription('Viajé en avión 100 km y usé bicicleta 5 km');
    expect(result.totalKgCo2).toBe(50); // 100 * 0.5
    expect(result.breakdown.some((i) => i.label.includes('avión'))).toBe(true);
    expect(result.breakdown.some((i) => i.label.includes('Bicicleta'))).toBe(true);
    const r2 = service.calculateFromDescription('Caminé 5 km');
    expect(r2.totalKgCo2).toBe(0);
    expect(r2.breakdown.some((i) => i.label.includes('Caminata'))).toBe(true);
  });

  it('reconoce sinónimos: manejar -> carro, tomar bus -> bus, volé -> avión', () => {
    const r1 = service.calculateFromDescription('Hoy manejé 10 km');
    expect(r1.totalKgCo2).toBe(2); // 10 * 0.2
    expect(r1.breakdown.some((i) => i.label.includes('carro'))).toBe(true);

    const r2 = service.calculateFromDescription('Tomé el bus 20 km');
    expect(r2.totalKgCo2).toBe(2); // 20 * 0.1
    expect(r2.breakdown.some((i) => i.label.includes('bus'))).toBe(true);

    const r3 = service.calculateFromDescription('Volé 100 km');
    expect(r3.totalKgCo2).toBe(50); // 100 * 0.5
    expect(r3.breakdown.some((i) => i.label.includes('avión'))).toBe(true);
  });
});
