import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  ValidationPipe,
  UsePipes
} from '@nestjs/common';
import { ClinicaService } from './clinica.service';
import { CreateClinicaDto } from './dto/create-clinica.dto';
import { UpdateClinicaDto } from './dto/update-clinica.dto';

@Controller('pacientes')
export class ClinicaController {
  constructor(private readonly clinicaMedicaService: ClinicaService) { }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createClinicaMedicaDto: CreateClinicaDto) {
    return this.clinicaMedicaService.create(createClinicaMedicaDto);
  }

  @Get()
  findAll(@Query('paciente') nombrePaciente?: string) {
    if (nombrePaciente) {
      return this.clinicaMedicaService.findByPatientName(nombrePaciente);
    }
    return this.clinicaMedicaService.findAll();
  }

  //OBTENER ESTADÍSTICAS
  @Get('stats')
  getStats() {
    return this.clinicaMedicaService.getStats();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clinicaMedicaService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClinicaDto: UpdateClinicaDto
  ) {
    return this.clinicaMedicaService.update(id, updateClinicaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clinicaMedicaService.remove(id);
  }
}