import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query, Req } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import * as express from 'express';

@Controller('sensor')
export class SensorController {

  constructor(private readonly sensorService: SensorService) { }

  @Post()
  create(@Body(new ValidationPipe()) data: CreateSensorDto) {
    return this.sensorService.create(data);
  }

  @Get("data")
  data() {
    return this.sensorService.data();
  }

  @Get("paginate")
  paginate(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 100,
    @Req() req: express.Request
  ) {
    const baseUrl = `${req.protocol}://${req.host}${req.baseUrl}/api/dsm44/sensor/paginate`;

    return this.sensorService.paginate(page, limit, baseUrl);
  }

  @Get()
  findAll() {
    return this.sensorService.findAll();
  }

  @Get(":id_sensor")
  findOne(@Param('id_sensor') id_sensor: string) {
    return this.sensorService.findOne(id_sensor);
  }

  @Patch(':id_sensor')
  update(@Param('id_sensor') id_sensor: string, @Body(new ValidationPipe()) data: UpdateSensorDto) {
    return this.sensorService.update(id_sensor, data);
  }

  @Delete(':id_sensor')
  remove(@Param('id_sensor') id_sensor: string) {
    return this.sensorService.remove(id_sensor);
  }

}