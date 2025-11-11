import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExamplesModule } from './examples/examples.module';
import { Example } from './examples/entities/example.entity';
import { EmpleadoModule } from './empleado/empleado.module';
import { Empleado } from './empleado/entities/empleado.entity';
import { ClinicaModule } from './clinica/clinica.module';
import { Clinica } from './clinica/entities/clinica.entity';
import { SensorModule } from './sensor/sensor.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/DSM44"),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "1234",
      database: "pollosanjuan",
      entities: [Example],
      synchronize: true,
      autoLoadEntities: true,

    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "1234",
      database: "empleadosdb",
      entities: [Empleado],
      synchronize: true,
      autoLoadEntities: true,
    }),

    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "1234",
      database: "clinica",
      entities: [Clinica],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ExamplesModule,
    EmpleadoModule,
    ClinicaModule,
    SensorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule { }