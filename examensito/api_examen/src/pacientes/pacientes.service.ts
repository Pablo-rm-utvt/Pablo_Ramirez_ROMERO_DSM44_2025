import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from './entities/paciente.entity';
import { Cita } from './entities/cita.entity';
import { Tratamiento } from './entities/tratamiento.entity';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { CreateTratamientoDto } from './dto/create-tratamiento.dto';
import { UpdateTratamientoDto } from './dto/update-tratamiento.dto';
import { EstatusCita } from './enum/estatus-cita.enum';

@Injectable()
export class PacientesService {
    constructor(
        @InjectRepository(Paciente, 'conexion-postgres')
        private readonly pacientesRepository: Repository<Paciente>,
        @InjectRepository(Cita, 'conexion-postgres')
        private readonly citasRepository: Repository<Cita>,
        @InjectRepository(Tratamiento, 'conexion-postgres')
        private readonly tratamientosRepository: Repository<Tratamiento>,
    ) { }

    // ==================== PACIENTES ====================

    /**
     * Obtener todos los pacientes con paginación
     */
    async findAllPaciente(page: number, limit: number) {
        const skip = (page - 1) * limit;
        const [data, total] = await this.pacientesRepository.findAndCount({
            skip,
            take: limit,
        });

        return {
            data,
            total,
            page,
            limit,
            pages: Math.ceil(total / limit),
        };
    }

    /**
     * Obtener todos los pacientes activos
     */
    async listarPacientesActivos() {
        return this.pacientesRepository.find({
            where: { activo: true },
        });
    }

    /**
     * Obtener paciente con sus citas
     */
    async pacienteConCitas(id: number) {
        const paciente = await this.pacientesRepository.findOne({
            where: { id_paciente: id },
            relations: ['citas', 'tratamientos'],
        });

        if (!paciente) {
            throw new NotFoundException(`Paciente con ID ${id} no encontrado`);
        }

        return paciente;
    }

    /**
     * Crear un nuevo paciente
     */
    async createPaciente(createPacienteDto: CreatePacienteDto) {
        const paciente = this.pacientesRepository.create(createPacienteDto);
        return this.pacientesRepository.save(paciente);
    }

    /**
     * Actualizar un paciente
     */
    async updatePaciente(id: number, updatePacienteDto: UpdatePacienteDto) {
        const paciente = await this.pacientesRepository.findOne({
            where: { id_paciente: id },
        });

        if (!paciente) {
            throw new NotFoundException(`Paciente con ID ${id} no encontrado`);
        }

        Object.assign(paciente, updatePacienteDto);
        return this.pacientesRepository.save(paciente);
    }

    /**
     * Eliminar un paciente
     */
    async deletePaciente(id: number) {
        const paciente = await this.pacientesRepository.findOne({
            where: { id_paciente: id },
        });

        if (!paciente) {
            throw new NotFoundException(`Paciente con ID ${id} no encontrado`);
        }

        return this.pacientesRepository.remove(paciente);
    }

    /**
     * Obtener pacientes por tipo de sangre con paginación
     */
    async pacientesPorTipoSangre(tipo_sangre: string, page: number, limit: number) {
        const skip = (page - 1) * limit;
        const [data, total] = await this.pacientesRepository.findAndCount({
            where: { tipo_sangre },
            skip,
            take: limit,
        });

        return {
            data,
            total,
            page,
            limit,
            pages: Math.ceil(total / limit),
        };
    }

    // ==================== CITAS ====================

    /**
     * Obtener citas de un paciente específico
     */
    async citasPorPaciente(id_paciente: number) {
        const paciente = await this.pacientesRepository.findOne({
            where: { id_paciente },
        });

        if (!paciente) {
            throw new NotFoundException(`Paciente con ID ${id_paciente} no encontrado`);
        }

        return this.citasRepository.find({
            where: { id_paciente },
            relations: ['paciente'],
        });
    }

    /**
     * Obtener citas por fecha con paginación
     */
    async citasPorFecha(fecha: string, page: number, limit: number) {
        const skip = (page - 1) * limit;
        const [data, total] = await this.citasRepository.findAndCount({
            where: { fecha: new Date(fecha) },
            relations: ['paciente'],
            skip,
            take: limit,
        });

        return {
            data,
            total,
            page,
            limit,
            pages: Math.ceil(total / limit),
        };
    }

    /**
     * Contar citas canceladas
     */
    async contarCitasCanceladas() {
        const total = await this.citasRepository.count({
            where: { estatus: EstatusCita.CANCELADA },
        });

        return {
            total,
            estatus: EstatusCita.CANCELADA,
        };
    }

    /**
     * Crear una nueva cita
     */
    async createCita(createCitaDto: CreateCitaDto) {
        const paciente = await this.pacientesRepository.findOne({
            where: { id_paciente: createCitaDto.id_paciente },
        });

        if (!paciente) {
            throw new NotFoundException(
                `Paciente con ID ${createCitaDto.id_paciente} no encontrado`,
            );
        }

        const cita = this.citasRepository.create(createCitaDto);
        return this.citasRepository.save(cita);
    }

    /**
     * Actualizar una cita
     */
    async updateCita(id_cita: number, updateCitaDto: UpdateCitaDto) {
        const cita = await this.citasRepository.findOne({
            where: { id_cita },
        });

        if (!cita) {
            throw new NotFoundException(`Cita con ID ${id_cita} no encontrada`);
        }

        Object.assign(cita, updateCitaDto);
        return this.citasRepository.save(cita);
    }

    /**
     * Eliminar una cita
     */
    async deleteCita(id_cita: number) {
        const cita = await this.citasRepository.findOne({
            where: { id_cita },
        });

        if (!cita) {
            throw new NotFoundException(`Cita con ID ${id_cita} no encontrada`);
        }

        return this.citasRepository.remove(cita);
    }

    // ==================== TRATAMIENTOS ====================

    /**
     * Obtener tratamientos por diagnóstico con paginación
     */
    async tratamientosPorDiagnostico(
        diagnostico: string,
        page: number,
        limit: number,
    ) {
        const skip = (page - 1) * limit;
        const [data, total] = await this.tratamientosRepository.findAndCount({
            where: { diagnostico },
            relations: ['paciente'],
            skip,
            take: limit,
        });

        return {
            data,
            total,
            page,
            limit,
            pages: Math.ceil(total / limit),
        };
    }

    /**
     * Obtener medicamentos de un paciente
     */
    async medicamentosDelPaciente(id_paciente: number) {
        const paciente = await this.pacientesRepository.findOne({
            where: { id_paciente },
        });

        if (!paciente) {
            throw new NotFoundException(`Paciente con ID ${id_paciente} no encontrado`);
        }

        const tratamientos = await this.tratamientosRepository.find({
            where: { id_paciente },
        });

        return tratamientos.map((tratamiento) => ({
            id_tratamiento: tratamiento.id_tratamiento,
            medicamento: tratamiento.medicamento,
            dosis: tratamiento.dosis,
            diagnostico: tratamiento.diagnostico,
            fecha_inicio: tratamiento.fecha_inicio,
            fecha_fin: tratamiento.fecha_fin,
        }));
    }

    /**
     * Crear un nuevo tratamiento
     */
    async createTratamiento(createTratamientoDto: CreateTratamientoDto) {
        const paciente = await this.pacientesRepository.findOne({
            where: { id_paciente: createTratamientoDto.id_paciente },
        });

        if (!paciente) {
            throw new NotFoundException(
                `Paciente con ID ${createTratamientoDto.id_paciente} no encontrado`,
            );
        }

        const tratamiento = this.tratamientosRepository.create(createTratamientoDto);
        return this.tratamientosRepository.save(tratamiento);
    }

    /**
     * Actualizar un tratamiento
     */
    async updateTratamiento(
        id_tratamiento: number,
        updateTratamientoDto: UpdateTratamientoDto,
    ) {
        const tratamiento = await this.tratamientosRepository.findOne({
            where: { id_tratamiento },
        });

        if (!tratamiento) {
            throw new NotFoundException(
                `Tratamiento con ID ${id_tratamiento} no encontrado`,
            );
        }

        Object.assign(tratamiento, updateTratamientoDto);
        return this.tratamientosRepository.save(tratamiento);
    }

    /**
     * Eliminar un tratamiento
     */
    async deleteTratamiento(id_tratamiento: number) {
        const tratamiento = await this.tratamientosRepository.findOne({
            where: { id_tratamiento },
        });

        if (!tratamiento) {
            throw new NotFoundException(
                `Tratamiento con ID ${id_tratamiento} no encontrado`,
            );
        }

        return this.tratamientosRepository.remove(tratamiento);
    }
}
