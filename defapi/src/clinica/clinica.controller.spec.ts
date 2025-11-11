import { Test, TestingModule } from '@nestjs/testing';
import { ClinicaController } from './clinica.controller';
import { ClinicaService } from './clinica.service';

describe('ClinicaController', () => {
  let controller: ClinicaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClinicaController],
      providers: [ClinicaService],
    }).compile();

    controller = module.get<ClinicaController>(ClinicaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
