import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from './pacientes/entities/paciente.entity';
import { Cita } from './pacientes/entities/cita.entity';
import { Tratamiento } from './pacientes/entities/tratamiento.entity';
import { PacientesModule } from './pacientes/pacientes.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            name: "conexion-postgres",
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "1234",
            database: "pacientes",
            entities: [Paciente, Cita, Tratamiento],
            synchronize: true,
            autoLoadEntities: true,
        }),

        PacientesModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
