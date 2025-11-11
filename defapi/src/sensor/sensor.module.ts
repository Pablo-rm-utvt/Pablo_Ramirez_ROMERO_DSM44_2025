import { Module } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { SensorController } from './sensor.controller';
import { Sensor, SensorSchema } from './schemas/sensor.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Sensor.name,
        schema: SensorSchema
      }
    ]),
  ],
  controllers: [SensorController],
  providers: [SensorService],
})
export class SensorModule { }