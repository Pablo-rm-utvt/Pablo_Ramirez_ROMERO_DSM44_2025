import { Controller, Get, Post, Put, Delete, Param, Query, Body, ParseIntPipe } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { CreateTratamientoDto } from './dto/create-tratamiento.dto';
import { UpdateTratamientoDto } from './dto/update-tratamiento.dto';

@Controller('pacientes')
export class PacientesController {
    constructor(private readonly pacientesService: PacientesService) {}

    @Get()
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ) {
        return this.pacientesService.findAllPaciente(Number(page), Number(limit));
    }

    @Get('activos')
    async listarActivos() {
        return this.pacientesService.listarPacientesActivos();
    }

    @Get('citas-paciente/:id_paciente')
    async citasPaciente(
        @Param('id_paciente', ParseIntPipe) id_paciente: number
    ) {
        return this.pacientesService.citasPorPaciente(id_paciente);
    }

    @Get('tratamientos-diagnostico/:diagnostico')
    async tratamientosDiagnostico(
        @Param('diagnostico') diagnostico: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ) {
        return this.pacientesService.tratamientosPorDiagnostico(diagnostico, Number(page), Number(limit));
    }

    @Get('citas-canceladas')
    contarCanceladas() {
        return this.pacientesService.contarCitasCanceladas();
    }

    @Get('tipo-sangre/:tipo_sangre')
    async porTipoSangre(
        @Param('tipo_sangre') tipo_sangre: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ) {
        return this.pacientesService.pacientesPorTipoSangre(tipo_sangre, Number(page), Number(limit));
    }

    @Get('citas-fecha/:fecha')
    async citasFecha(
        @Param('fecha') fecha: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ) {
        return this.pacientesService.citasPorFecha(fecha, Number(page), Number(limit));
    }

    @Get('medicamentos/:id_paciente')
    medicamentosPaciente(@Param('id_paciente', ParseIntPipe) id_paciente: number) {
        return this.pacientesService.medicamentosDelPaciente(id_paciente);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.pacientesService.pacienteConCitas(id);
    }

    // ==================== PACIENTES CRUD ====================

    @Post()
    create(@Body() createPacienteDto: CreatePacienteDto) {
        return this.pacientesService.createPaciente(createPacienteDto);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updatePacienteDto: UpdatePacienteDto) {
        return this.pacientesService.updatePaciente(id, updatePacienteDto);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.pacientesService.deletePaciente(id);
    }

    // ==================== CITAS CRUD ====================

    @Post('citas')
    createCita(@Body() createCitaDto: CreateCitaDto) {
        return this.pacientesService.createCita(createCitaDto);
    }

    @Put('citas/:id_cita')
    updateCita(@Param('id_cita', ParseIntPipe) id_cita: number, @Body() updateCitaDto: UpdateCitaDto) {
        return this.pacientesService.updateCita(id_cita, updateCitaDto);
    }

    @Delete('citas/:id_cita')
    deleteCita(@Param('id_cita', ParseIntPipe) id_cita: number) {
        return this.pacientesService.deleteCita(id_cita);
    }

    // ==================== TRATAMIENTOS CRUD ====================

    @Post('tratamientos')
    createTratamiento(@Body() createTratamientoDto: CreateTratamientoDto) {
        return this.pacientesService.createTratamiento(createTratamientoDto);
    }

    @Put('tratamientos/:id_tratamiento')
    updateTratamiento(@Param('id_tratamiento', ParseIntPipe) id_tratamiento: number, @Body() updateTratamientoDto: UpdateTratamientoDto) {
        return this.pacientesService.updateTratamiento(id_tratamiento, updateTratamientoDto);
    }

    @Delete('tratamientos/:id_tratamiento')
    deleteTratamiento(@Param('id_tratamiento', ParseIntPipe) id_tratamiento: number) {
        return this.pacientesService.deleteTratamiento(id_tratamiento);
    }
}
