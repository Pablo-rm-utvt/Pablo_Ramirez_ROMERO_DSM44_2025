import { Module } from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { EmpleadosController } from './empleados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empleado } from './entities/empleado.entity';
import { RegistroAsistencia } from './entities/registro-asistencia.entity';
import { RegistroProduccion } from './entities/registro-produccion.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Empleado,
            RegistroAsistencia,
            RegistroProduccion
        ],"conexion-postgres")
    ],
    controllers: [EmpleadosController],
    providers: [EmpleadosService],
})
export class EmpleadosModule {}
