import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from './entities/paciente.entity';
import { Cita } from './entities/cita.entity';
import { Tratamiento } from './entities/tratamiento.entity';
import { EstatusCita } from './enum/estatus-cita.enum';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { CreateTratamientoDto } from './dto/create-tratamiento.dto';
import { UpdateTratamientoDto } from './dto/update-tratamiento.dto';

@Injectable()
export class PacientesService {
    constructor(
        @InjectRepository(Paciente, "conexion-postgres")
        private readonly repoPaciente: Repository<Paciente>,
        @InjectRepository(Cita, "conexion-postgres")
        private readonly repoCita: Repository<Cita>,
        @InjectRepository(Tratamiento, "conexion-postgres")
        private readonly repoTratamiento: Repository<Tratamiento>,
    ){}

    async listarPacientesActivos() {
        const data = await this.repoPaciente
            .createQueryBuilder("p")
            .where("p.activo = :activo", { activo: true })
            .orderBy("p.id_paciente", "ASC")
            .getMany();

        return data;
    }

    async citasPorPaciente(id_paciente: number) {
        const paciente = await this.repoPaciente.findOne({
            where: { id_paciente: id_paciente }
        });

        if (!paciente) {
            throw new NotFoundException(`Paciente con ID ${id_paciente} no encontrado`);
        }

        const data = await this.repoCita
            .createQueryBuilder("c")
            .where("c.id_paciente = :id_paciente", { id_paciente })
            .orderBy("c.fecha", "DESC")
            .getMany();

        return data;
    }

    async tratamientosPorDiagnostico(diagnostico: string, page: number = 1, limit: number = 10) {
        const [data, total] = await this.repoTratamiento
            .createQueryBuilder("t")
            .where("t.diagnostico ILIKE :diagnostico", { diagnostico: `%${diagnostico}%` })
            .orderBy("t.id_tratamiento", "ASC")
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();

        const totalPages = Math.ceil(total / limit);

        return {
            pagination: {
                total,
                page,
                limit,
                totalPages
            },
            data
        };
    }

    async contarCitasCanceladas() {
        const total = await this.repoCita
            .createQueryBuilder("c")
            .where("c.estatus = :estatus", { estatus: EstatusCita.CANCELADA })
            .getCount();

        return { totalCitasCanceladas: total };
    }

    async pacientesPorTipoSangre(tipo_sangre: string, page: number = 1, limit: number = 10) {
        const [data, total] = await this.repoPaciente
            .createQueryBuilder("p")
            .where("p.tipo_sangre = :tipo_sangre", { tipo_sangre })
            .orderBy("p.id_paciente", "ASC")
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();

        const totalPages = Math.ceil(total / limit);

        return {
            pagination: {
                total,
                page,
                limit,
                totalPages
            },
            data
        };
    }

    async citasPorFecha(fecha: string, page: number = 1, limit: number = 10) {
        const fechaDate = new Date(fecha);

        const [data, total] = await this.repoCita
            .createQueryBuilder("c")
            .where("DATE(c.fecha) = :fecha", { fecha: fechaDate.toISOString().split('T')[0] })
            .orderBy("c.hora", "ASC")
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();

        const totalPages = Math.ceil(total / limit);

        return {
            pagination: {
                total,
                page,
                limit,
                totalPages
            },
            data
        };
    }

    async medicamentosDelPaciente(id_paciente: number) {
        const paciente = await this.repoPaciente.findOne({
            where: { id_paciente: id_paciente }
        });

        if (!paciente) {
            throw new NotFoundException(`Paciente con ID ${id_paciente} no encontrado`);
        }

        const medicamentos = await this.repoTratamiento
            .createQueryBuilder("t")
            .select("t.medicamento", "medicamento")
            .addSelect("t.dosis", "dosis")
            .where("t.id_paciente = :id_paciente", { id_paciente })
            .getRawMany();

        return {
            id_paciente,
            medicamentos: medicamentos.map(m => ({
                medicamento: m.medicamento,
                dosis: m.dosis
            }))
        };
    }

    async pacienteConCitas(id_paciente: number) {
        const paciente = await this.repoPaciente.findOne({
            where: { id_paciente: id_paciente },
            relations: ['citas']
        });

        if (!paciente) {
            throw new NotFoundException(`Paciente con ID ${id_paciente} no encontrado`);
        }

        return paciente;
    }

    async findAllPaciente(page: number = 1, limit: number = 10) {
        const [data, total] = await this.repoPaciente
            .createQueryBuilder("p")
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy("p.id_paciente", "ASC")
            .getManyAndCount();

        const totalPages = Math.ceil(total / limit);

        return {
            pagination: {
                total,
                page,
                limit,
                totalPages
            },
            data
        };
    }

    // ==================== PACIENTES CRUD ====================

    async createPaciente(createPacienteDto: CreatePacienteDto) {
        const paciente = this.repoPaciente.create(createPacienteDto);
        return await this.repoPaciente.save(paciente);
    }

    async updatePaciente(id_paciente: number, updatePacienteDto: UpdatePacienteDto) {
        const paciente = await this.repoPaciente.findOne({
            where: { id_paciente }
        });

        if (!paciente) {
            throw new NotFoundException(`Paciente con ID ${id_paciente} no encontrado`);
        }

        Object.assign(paciente, updatePacienteDto);
        return await this.repoPaciente.save(paciente);
    }

    async deletePaciente(id_paciente: number) {
        const paciente = await this.repoPaciente.findOne({
            where: { id_paciente }
        });

        if (!paciente) {
            throw new NotFoundException(`Paciente con ID ${id_paciente} no encontrado`);
        }

        await this.repoPaciente.remove(paciente);
        return { message: `Paciente ${id_paciente} eliminado exitosamente` };
    }

    // ==================== CITAS CRUD ====================

    async createCita(createCitaDto: CreateCitaDto) {
        // Validar que el paciente exista
        const paciente = await this.repoPaciente.findOne({
            where: { id_paciente: createCitaDto.id_paciente }
        });

        if (!paciente) {
            throw new NotFoundException(`Paciente con ID ${createCitaDto.id_paciente} no encontrado`);
        }

        const cita = this.repoCita.create(createCitaDto);
        return await this.repoCita.save(cita);
    }

    async updateCita(id_cita: number, updateCitaDto: UpdateCitaDto) {
        const cita = await this.repoCita.findOne({
            where: { id_cita }
        });

        if (!cita) {
            throw new NotFoundException(`Cita con ID ${id_cita} no encontrada`);
        }

        Object.assign(cita, updateCitaDto);
        return await this.repoCita.save(cita);
    }

    async deleteCita(id_cita: number) {
        const cita = await this.repoCita.findOne({
            where: { id_cita }
        });

        if (!cita) {
            throw new NotFoundException(`Cita con ID ${id_cita} no encontrada`);
        }

        await this.repoCita.remove(cita);
        return { message: `Cita ${id_cita} eliminada exitosamente` };
    }

    // ==================== TRATAMIENTOS CRUD ====================

    async createTratamiento(createTratamientoDto: CreateTratamientoDto) {
        // Validar que el paciente exista
        const paciente = await this.repoPaciente.findOne({
            where: { id_paciente: createTratamientoDto.id_paciente }
        });

        if (!paciente) {
            throw new NotFoundException(`Paciente con ID ${createTratamientoDto.id_paciente} no encontrado`);
        }

        const tratamiento = this.repoTratamiento.create(createTratamientoDto);
        return await this.repoTratamiento.save(tratamiento);
    }

    async updateTratamiento(id_tratamiento: number, updateTratamientoDto: UpdateTratamientoDto) {
        const tratamiento = await this.repoTratamiento.findOne({
            where: { id_tratamiento }
        });

        if (!tratamiento) {
            throw new NotFoundException(`Tratamiento con ID ${id_tratamiento} no encontrado`);
        }

        Object.assign(tratamiento, updateTratamientoDto);
        return await this.repoTratamiento.save(tratamiento);
    }

    async deleteTratamiento(id_tratamiento: number) {
        const tratamiento = await this.repoTratamiento.findOne({
            where: { id_tratamiento }
        });

        if (!tratamiento) {
            throw new NotFoundException(`Tratamiento con ID ${id_tratamiento} no encontrado`);
        }

        await this.repoTratamiento.remove(tratamiento);
        return { message: `Tratamiento ${id_tratamiento} eliminado exitosamente` };
    }
}
