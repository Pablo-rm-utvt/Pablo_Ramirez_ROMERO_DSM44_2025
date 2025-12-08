import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empleado } from './empleados/entities/empleado.entity';
import { RegistroAsistencia } from './empleados/entities/registro-asistencia.entity';
import { RegistroProduccion } from './empleados/entities/registro-produccion.entity';
import { EmpleadosModule } from './empleados/empleados.module';
@Module({
    imports: [
        TypeOrmModule.forRoot({
            name: "conexion-postgres",
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "1234",
            database: "empresa",
            entities: [Empleado, RegistroAsistencia, RegistroProduccion],
            synchronize: true,
            autoLoadEntities: true,
        }),

        EmpleadosModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
