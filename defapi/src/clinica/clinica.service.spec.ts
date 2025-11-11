import { Test, TestingModule } from '@nestjs/testing';
import { ClinicaService } from './clinica.service';

describe('ClinicaService', () => {
  let service: ClinicaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClinicaService],
    }).compile();

    service = module.get<ClinicaService>(ClinicaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
