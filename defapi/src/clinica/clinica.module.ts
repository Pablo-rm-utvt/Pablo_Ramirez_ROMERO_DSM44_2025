import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicaService } from './clinica.service';
import { ClinicaController } from './clinica.controller';
import { Clinica } from './entities/clinica.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Clinica])
  ],
  controllers: [ClinicaController],
  providers: [ClinicaService],
  exports: [ClinicaService]
})
export class ClinicaModule { }