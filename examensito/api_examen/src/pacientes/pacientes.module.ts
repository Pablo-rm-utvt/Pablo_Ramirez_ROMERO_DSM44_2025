import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacientesService } from './pacientes.service';
import { PacientesController } from './pacientes.controller';
import { Paciente } from './entities/paciente.entity';
import { Cita } from './entities/cita.entity';
import { Tratamiento } from './entities/tratamiento.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [Paciente, Cita, Tratamiento],
            'conexion-postgres'
        )
    ],
    controllers: [PacientesController],
    providers: [PacientesService],
    exports: [PacientesService, TypeOrmModule]
})
export class PacientesModule { }
