import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query, Req } from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { CreateEmpleado } from './dto/create-empleado.dto';
import { UpdateEmpleado } from './dto/update-empleado.dto';
import * as express from 'express';
import { CreateRegistroAsistencia } from './dto/create-registro-asistencia.dto';
import { CreateRegistroProduccion } from './dto/create-registro-produccion.dto';

@Controller('empleados')
export class EmpleadosController {
    constructor(private readonly empleadosService: EmpleadosService) { }

    @Post()
    createEmpleado(@Body(new ValidationPipe()) data: CreateEmpleado) {
        return this.empleadosService.createEmpleado(data);
    }

    @Post("create-asistencia")
    asistencia(@Body(new ValidationPipe()) data: CreateRegistroAsistencia) {
        return this.empleadosService.createRegistroAsistencia(data);
    }

    @Post("create-produccion")
    produccion(@Body(new ValidationPipe()) data: CreateRegistroProduccion) {
        return this.empleadosService.createRegistroProduccion(data);
    }

    @Get("asistencia-empleado")
    getAsistencia(
        @Query('id_empleado') id_empleado: number,
        @Query('fechaInicio') fechaInicio: string,
        @Query('fechaFin') fechaFin: string,
    ) {
        return this.empleadosService.getAsistencia(id_empleado, fechaInicio, fechaFin);
    }

    @Get("nomina")
    getNomina(
        @Query('id_empleado') id_empleado: number,
        @Query('fechaInicio') fechaInicio: string,
        @Query('fechaFin') fechaFin: string,
    ) {
        return this.empleadosService.getNomina(id_empleado, fechaInicio, fechaFin);
    }

    @Get("dias-trabajados")
    getDiasTrabajados(
        @Query('id_empleado') id_empleado: number,
        @Query('fechaInicio') fechaInicio: string,
        @Query('fechaFin') fechaFin: string,
    ) {
        return this.empleadosService.getDiasTrabajados(id_empleado, fechaInicio, fechaFin);
    }

    @Get("reporte-asistencia-empleado")
    getReporteAsistencia(
        @Query('id_empleado') id_empleado: number,
        @Query('fechaInicio') fechaInicio: string,
        @Query('fechaFin') fechaFin: string,
    ) {
        return this.empleadosService.getReporteAsistencia(id_empleado, fechaInicio, fechaFin);
    }

    @Get("reporte-produccion")
    getReporteProduccion(
        @Query('id_empleado') id_empleado: number,
        @Query('fechaInicio') fechaInicio: string,
        @Query('fechaFin') fechaFin: string,
    ) {
        return this.empleadosService.getReporteProduccion(id_empleado, fechaInicio, fechaFin);
    }

    @Get("horas-trabajadas")
    getReporteHorasTrabajadas(
        @Query('id_empleado') id_empleado: number,
        @Query('fechaInicio') fechaInicio: string,
        @Query('fechaFin') fechaFin: string,
    ) {
        return this.empleadosService.getReporteHorasTrabajadas(id_empleado, fechaInicio, fechaFin);
    }

    @Get("unidades-producidas")
    getProduccionTotal(
        @Query('id_empleado') id_empleado: number,
        @Query('fechaInicio') fechaInicio: string,
        @Query('fechaFin') fechaFin: string,
    ) {
        return this.empleadosService.getProduccionTotal(id_empleado, fechaInicio, fechaFin);
    }

    @Get()
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Req() req: express.Request
    ) {
        const baseUrl = `${req.protocol}://${req.host}${req.baseUrl}/api/empleados`;

        return this.empleadosService.findAllEmpleado(Number(page), Number(limit), baseUrl);
    }

    @Get(':id_empleado')
    findOne(@Param('id_empleado') id_empleado: number) {
        return this.empleadosService.findOneEmpleado(id_empleado);
    }

    @Patch(':id_empleado')
    update(@Param('id_empleado') id_empleado: number, @Body(new ValidationPipe()) data: UpdateEmpleado) {
        return this.empleadosService.updateEmpleado(id_empleado, data);
    }

    @Delete(':id_empleado')
    remove(@Param('id_empleado') id_empleado: number) {
        return this.empleadosService.removeEmpleado(id_empleado);
    }

    @Post("entrada/:id_empleado")
    createAistenciaEntrada(@Param("id_empleado") id_empleado: number) {
        return this.createAistenciaEntrada(id_empleado);
    }

    @Patch("salida/:id_empleado")
    updateAistenciaSalida(@Param("id_empleado") id_empleado: number) {
        return this.updateAistenciaSalida(id_empleado);
    }

    @Post("produccion/:id_empleado/:unidadesProducidas")
    createProduccion(@Param("id_empleado") id_empleado: number, @Param("unidadesProducidas") unidadesProducidas: number) {
        return this.createProduccion(id_empleado, unidadesProducidas);
    }

}
