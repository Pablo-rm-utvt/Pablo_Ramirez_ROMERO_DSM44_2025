import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExamplesModule } from './examples/examples.module';
import { Example } from './examples/entities/example.entity';
import { EmpleadosModule } from './empleados/empleados.module';
import { ClinicaModule } from './clinica/clinica.module';
import { Clinica } from './clinica/entities/clinica.entity';
import { SensorModule } from './sensor/sensor.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Empleado } from './empleados/entities/empleado.entity';
import { RegistroAsistencia } from './empleados/entities/registro-asistencia.entity';
import { RegistroProduccion } from './empleados/entities/registro-produccion.entity';


@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/DSM44"),
    TypeOrmModule.forRoot({

      name: "conexion-postgres-form",
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "1234",
      database: "formularios",
      entities: [Example],
      synchronize: true,
      autoLoadEntities: true,

    }),

    TypeOrmModule.forRoot({
      name: "conexion-postgres",
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "1234",
      database: "dsm44",
      entities: [Empleado, RegistroAsistencia, RegistroProduccion],
      synchronize: true,
      autoLoadEntities: true,
    }),

    TypeOrmModule.forRoot({
      name: "conexion-postgres-form",
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "1234",
      database: "formularios",
      entities: [Clinica],
      synchronize: true,
      autoLoadEntities: true,
    }),
    EmpleadosModule,
    ExamplesModule,
    ClinicaModule,
    SensorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule { }