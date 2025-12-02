import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empleado } from './entities/empleado.entity';
import { RegistroAsistencia } from './entities/registro-asistencia.entity';
import { RegistroProduccion } from './entities/registro-produccion.entity';
import { CreateEmpleado } from './dto/create-empleado.dto';
import { UpdateEmpleado } from './dto/update-empleado.dto';
import { CreateRegistroAsistencia } from './dto/create-registro-asistencia.dto';
import { CreateRegistroProduccion } from './dto/create-registro-produccion.dto';
import { Turno } from './enum/turno.enum';
import { StatusTurno } from './enum/status-turno.enum';
import { Between } from 'typeorm';

@Injectable()
export class EmpleadosService {
    constructor(
        @InjectRepository(Empleado, "conexion-postgres")
        private readonly repoEmpleado: Repository<Empleado>,
        @InjectRepository(RegistroAsistencia, "conexion-postgres")
        private readonly repoAsistencia: Repository<RegistroAsistencia>,
        @InjectRepository(RegistroProduccion, "conexion-postgres")
        private readonly repoProduccion: Repository<RegistroProduccion>,
    ) { }

    private readonly horariosTurno = {
        [Turno.MATUTINO]: { inicio: "06:00", fin: "14:00" },
        [Turno.VESPERTINO]: { inicio: "14:00", fin: "22:00" },
        [Turno.NOCTURNO]: { inicio: "22:00", fin: "06:00" },
        [Turno.MIXTO]: { inicio: "12:00", fin: "00:00" },
    }

    private convertirFecha(fecha: string) {
        const [day, month, year] = fecha.split("/").map(Number);
        return new Date(year, month - 1, day);
    }

    async createRegistroAsistencia(data: CreateRegistroAsistencia) {
        const empleado = await this.findOneEmpleado(data.id_empleado!);

        delete data.id_empleado;

        const register = this.repoAsistencia.create({
            empleado,
            ...data
        });

        return await this.repoAsistencia.save(register);
    }

    async createRegistroProduccion(data: CreateRegistroProduccion) {
        const empleado = await this.findOneEmpleado(data.id_empleado!);

        delete data.id_empleado;

        const register = this.repoProduccion.create({
            empleado,
            ...data
        });

        return await this.repoProduccion.save(register);
    }

    async createEmpleado(data: CreateEmpleado) {
        const register = this.repoEmpleado.create(data);
        return await this.repoEmpleado.save(register);
    }

    async findAllEmpleado(page: number = 1, limit: number = 10, baseUrl: string) {
        const [data, total] = await this.repoEmpleado
            .createQueryBuilder("e")
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy("e.id_empleado", "ASC")
            .getManyAndCount();

        for (const empleado of data) {
            empleado.produccion = await this.repoProduccion
                .createQueryBuilder("p")
                .where("p.id_empleado = :id", { id: empleado.id_empleado })
                .orderBy("p.id_reg_p", "DESC")
                .limit(5)
                .getMany();

            empleado.asistencia = await this.repoAsistencia
                .createQueryBuilder("a")
                .where("a.id_empleado = :id", { id: empleado.id_empleado })
                .orderBy("a.fecha", "DESC")
                .limit(5)
                .getMany();
        }

        const totalPages = Math.ceil(total / limit);

        const next = (page < totalPages)
            ? `${baseUrl}?page=${Number(page) + 1}&limit=${limit}`
            : null;

        const prev = (page > 1)
            ? `${baseUrl}?page=${Number(page) - 1}&limit=${limit}`
            : null;

        return {
            total,
            totalPages,
            prev,
            next,
            page,
            limit,
            data,
        };
    }

    async findOneEmpleado(id_empleado: number) {
        const empleado = await this.repoEmpleado.findOne({
            where: { id_empleado },
            relations: ["produccion", "asistencia"]
        });
        if (!empleado) throw new NotFoundException("Empleado no encontrado");
        return empleado;
    }

    async updateEmpleado(id_empleado: number, data: UpdateEmpleado) {
        return await this.repoEmpleado.update(id_empleado, data);
    }

    async removeEmpleado(id_empleado: number) {
        return await this.repoEmpleado.delete(id_empleado);
    }

    async createAistenciaEntrada(id_empleado: number) {
        const empleado = await this.findOneEmpleado(id_empleado);

        const hoy = new Date();
        const horaActual = hoy.toTimeString().slice(0, 5);
        const horaInicio = this.horariosTurno[empleado.turno].inicio;
        const puntual = horaActual <= horaInicio;

        const registroExistente = await this.repoAsistencia.findOne({
            where: {
                empleado: { id_empleado },
                fecha: new Date(hoy.toISOString().split("T")[0]),
                estatus: StatusTurno.EN_TURNO
            }
        });

        if (registroExistente) throw new Error('Ya hay un turno activo hoy');

        const registro = this.repoAsistencia.create({
            empleado,
            fecha: hoy,
            horaEntrada: hoy,
            turno: empleado.turno,
            puntual,
            estatus: StatusTurno.EN_TURNO
        });

        return this.repoAsistencia.save(registro);
    }

    async updateAistenciaSalida(id_empleado: number) {
        const registro = await this.repoAsistencia.findOne({
            where: {
                empleado: { id_empleado },
                estatus: StatusTurno.EN_TURNO
            },
            relations: ["Empleado"]
        });

        if (!registro) throw new Error('No hay un turno activo para este empleado');

        const ahora = new Date();
        registro.horaSalida = ahora;
        const horas = (ahora.getTime() - registro.horaEntrada.getTime()) / 3600000;
        registro.horasTrabajadas = horas;
        registro.estatus = StatusTurno.FINALIZADO;

        return await this.repoAsistencia.save(registro);

    }

    async createProduccion(id_empleado: number, unidadesProducidas: number) {
        const empleado = await this.findOneEmpleado(id_empleado);

        if (!empleado) throw new NotFoundException("Empleado no encontrado");

        const produccion = this.repoProduccion.create({
            empleado,
            fecha: new Date(),
            turno: empleado.turno,
            unidadesProducidas
        });

        return await this.repoProduccion.save(produccion);
    }

    async getAsistencia(id_empleado: number, fechaInicio: string, fechaFin: string) {
        // http://localhost:3000/api/empleados/reporte-asistencia-empleado?id_empleado=8000&fechaInicio=01/01/2025&fechaFin=02/01/2025
        return await this.repoAsistencia
            .createQueryBuilder("a")
            .select([
                "COUNT(a.id_empleado) as total_asistencias",
            ])
            .where("a.id_empleado = :id", { id: id_empleado })
            .andWhere("a.fecha BETWEEN :inicio AND :fin", { inicio: fechaInicio, fin: fechaFin })
            .getRawOne();
    }

    async getNomina(id_empleado: number, fechaInicio: string, fechaFin: string) {
        const inicio = this.convertirFecha(fechaInicio);
        const fin = this.convertirFecha(fechaFin);
        const empleado = await this.findOneEmpleado(id_empleado);
        const asistencias = await this.repoAsistencia.find({
            where: { empleado, horaEntrada: Between(inicio, fin) }
        });
        const diasTrabajados = asistencias.length;
        const total = diasTrabajados * empleado.salarioDiario;
        return { diasTrabajados, asistencias, total };
    }

    async getDiasTrabajados(id_empleado: number, fechaInicio: string, fechaFin: string) {
        return await this.repoAsistencia
            .createQueryBuilder("a")
            .select([
                "a.id_reg_a",
                "a.fecha",
                "a.horaEntrada",
                "a.horaSalida"
            ])
            .where("a.id_empleado = :id", { id: id_empleado })
            .andWhere("a.fecha BETWEEN :inicio AND :fin", { inicio: fechaInicio, fin: fechaFin })
            .orderBy("a.id_reg_a", "DESC")
            .getRawMany();
    }

    async getReporteAsistencia(id_empleado: number, fechaInicio: string, fechaFin: string) {
        const data = await this.repoAsistencia
            .createQueryBuilder("a")
            .leftJoin("a.empleado", "e")
            .select([
                "a.id_reg_a",
                "a.fecha",
                "a.horaEntrada",
                "a.horaSalida",
                "a.turno",
                "e.id_empleado",
                "e.nombre",
                "e.apellido_p",
                "e.apellido_m",
            ])
            .where("a.id_empleado = :id", { id: id_empleado })
            .andWhere("a.fecha BETWEEN :inicio AND :fin", { inicio: fechaInicio, fin: fechaFin })
            .orderBy("a.fecha", "DESC")
            .getRawMany();

        return { total: data.length, data };
    }

    async getReporteProduccion(id_empleado: number, fechaInicio: string, fechaFin: string) {
        return await this.repoProduccion
            .createQueryBuilder("p")
            .leftJoin("p.empleado", "e")
            .select([
                "p.id_reg_p",
                "p.fecha",
                "p.turno",
                "p.unidadesProducidas",
                "e.id_empleado",
                "e.nombre",
                "e.apellido_p",
                "e.apellido_m"
            ])
            .where("p.id_empleado = :id", { id: id_empleado })
            .andWhere("p.fecha BETWEEN :inicio AND :fin", { inicio: fechaInicio, fin: fechaFin })
            .orderBy("p.fecha", "DESC")
            .getRawMany();
    }

    async getReporteHorasTrabajadas(id_empleado: number, fechaInicio: string, fechaFin: string) {
        return await this.repoAsistencia
            .createQueryBuilder("a")
            .leftJoin("a.empleado", "e")
            .select([
                "a.id_reg_a",
                "a.fecha",
                "a.turno",
                "a.horasTrabajadas",
                "e.nombre",
                "e.apellido_p",
                "e.apellido_m"
            ])
            .where("a.id_empleado = :id", { id: id_empleado })
            .andWhere("a.fecha BETWEEN :inicio AND :fin", { inicio: fechaInicio, fin: fechaFin })
            .orderBy("a.fecha", "DESC")
            .getRawMany();
    }

    async getProduccionTotal(id_empleado: number, fechaInicio: string, fechaFin: string) {
        const empleado = this.findOneEmpleado(id_empleado);
        const total = await this.repoProduccion
            .createQueryBuilder("p")
            .innerJoin("p.empleado", "e")
            .select([
                "SUM(p.unidadesProducidas) as total_producido",
            ])
            .where("p.id_empleado = :id", { id: id_empleado })
            .andWhere("p.fecha BETWEEN :inicio AND :fin", { inicio: fechaInicio, fin: fechaFin })
            .getRawMany();
        return { empleado, total };
    }
}
