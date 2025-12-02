"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpleadosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const empleado_entity_1 = require("./entities/empleado.entity");
const registro_asistencia_entity_1 = require("./entities/registro-asistencia.entity");
const registro_produccion_entity_1 = require("./entities/registro-produccion.entity");
const turno_enum_1 = require("./enum/turno.enum");
const status_turno_enum_1 = require("./enum/status-turno.enum");
const typeorm_3 = require("typeorm");
let EmpleadosService = class EmpleadosService {
    repoEmpleado;
    repoAsistencia;
    repoProduccion;
    constructor(repoEmpleado, repoAsistencia, repoProduccion) {
        this.repoEmpleado = repoEmpleado;
        this.repoAsistencia = repoAsistencia;
        this.repoProduccion = repoProduccion;
    }
    horariosTurno = {
        [turno_enum_1.Turno.MATUTINO]: { inicio: "06:00", fin: "14:00" },
        [turno_enum_1.Turno.VESPERTINO]: { inicio: "14:00", fin: "22:00" },
        [turno_enum_1.Turno.NOCTURNO]: { inicio: "22:00", fin: "06:00" },
        [turno_enum_1.Turno.MIXTO]: { inicio: "12:00", fin: "00:00" },
    };
    convertirFecha(fecha) {
        const [day, month, year] = fecha.split("/").map(Number);
        return new Date(year, month - 1, day);
    }
    async createRegistroAsistencia(data) {
        const empleado = await this.findOneEmpleado(data.id_empleado);
        delete data.id_empleado;
        const register = this.repoAsistencia.create({
            empleado,
            ...data
        });
        return await this.repoAsistencia.save(register);
    }
    async createRegistroProduccion(data) {
        const empleado = await this.findOneEmpleado(data.id_empleado);
        delete data.id_empleado;
        const register = this.repoProduccion.create({
            empleado,
            ...data
        });
        return await this.repoProduccion.save(register);
    }
    async createEmpleado(data) {
        const register = this.repoEmpleado.create(data);
        return await this.repoEmpleado.save(register);
    }
    async findAllEmpleado(page = 1, limit = 10, baseUrl) {
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
    async findOneEmpleado(id_empleado) {
        const empleado = await this.repoEmpleado.findOne({
            where: { id_empleado },
            relations: ["produccion", "asistencia"]
        });
        if (!empleado)
            throw new common_1.NotFoundException("Empleado no encontrado");
        return empleado;
    }
    async updateEmpleado(id_empleado, data) {
        return await this.repoEmpleado.update(id_empleado, data);
    }
    async removeEmpleado(id_empleado) {
        return await this.repoEmpleado.delete(id_empleado);
    }
    async createAistenciaEntrada(id_empleado) {
        const empleado = await this.findOneEmpleado(id_empleado);
        const hoy = new Date();
        const horaActual = hoy.toTimeString().slice(0, 5);
        const horaInicio = this.horariosTurno[empleado.turno].inicio;
        const puntual = horaActual <= horaInicio;
        const registroExistente = await this.repoAsistencia.findOne({
            where: {
                empleado: { id_empleado },
                fecha: new Date(hoy.toISOString().split("T")[0]),
                estatus: status_turno_enum_1.StatusTurno.EN_TURNO
            }
        });
        if (registroExistente)
            throw new Error('Ya hay un turno activo hoy');
        const registro = this.repoAsistencia.create({
            empleado,
            fecha: hoy,
            horaEntrada: hoy,
            turno: empleado.turno,
            puntual,
            estatus: status_turno_enum_1.StatusTurno.EN_TURNO
        });
        return this.repoAsistencia.save(registro);
    }
    async updateAistenciaSalida(id_empleado) {
        const registro = await this.repoAsistencia.findOne({
            where: {
                empleado: { id_empleado },
                estatus: status_turno_enum_1.StatusTurno.EN_TURNO
            },
            relations: ["Empleado"]
        });
        if (!registro)
            throw new Error('No hay un turno activo para este empleado');
        const ahora = new Date();
        registro.horaSalida = ahora;
        const horas = (ahora.getTime() - registro.horaEntrada.getTime()) / 3600000;
        registro.horasTrabajadas = horas;
        registro.estatus = status_turno_enum_1.StatusTurno.FINALIZADO;
        return await this.repoAsistencia.save(registro);
    }
    async createProduccion(id_empleado, unidadesProducidas) {
        const empleado = await this.findOneEmpleado(id_empleado);
        if (!empleado)
            throw new common_1.NotFoundException("Empleado no encontrado");
        const produccion = this.repoProduccion.create({
            empleado,
            fecha: new Date(),
            turno: empleado.turno,
            unidadesProducidas
        });
        return await this.repoProduccion.save(produccion);
    }
    async getAsistencia(id_empleado, fechaInicio, fechaFin) {
        return await this.repoAsistencia
            .createQueryBuilder("a")
            .select([
            "COUNT(a.id_empleado) as total_asistencias",
        ])
            .where("a.id_empleado = :id", { id: id_empleado })
            .andWhere("a.fecha BETWEEN :inicio AND :fin", { inicio: fechaInicio, fin: fechaFin })
            .getRawOne();
    }
    async getNomina(id_empleado, fechaInicio, fechaFin) {
        const inicio = this.convertirFecha(fechaInicio);
        const fin = this.convertirFecha(fechaFin);
        const empleado = await this.findOneEmpleado(id_empleado);
        const asistencias = await this.repoAsistencia.find({
            where: { empleado, horaEntrada: (0, typeorm_3.Between)(inicio, fin) }
        });
        const diasTrabajados = asistencias.length;
        const total = diasTrabajados * empleado.salarioDiario;
        return { diasTrabajados, asistencias, total };
    }
    async getDiasTrabajados(id_empleado, fechaInicio, fechaFin) {
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
    async getReporteAsistencia(id_empleado, fechaInicio, fechaFin) {
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
    async getReporteProduccion(id_empleado, fechaInicio, fechaFin) {
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
    async getReporteHorasTrabajadas(id_empleado, fechaInicio, fechaFin) {
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
    async getProduccionTotal(id_empleado, fechaInicio, fechaFin) {
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
};
exports.EmpleadosService = EmpleadosService;
exports.EmpleadosService = EmpleadosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(empleado_entity_1.Empleado, "conexion-postgres")),
    __param(1, (0, typeorm_1.InjectRepository)(registro_asistencia_entity_1.RegistroAsistencia, "conexion-postgres")),
    __param(2, (0, typeorm_1.InjectRepository)(registro_produccion_entity_1.RegistroProduccion, "conexion-postgres")),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EmpleadosService);
//# sourceMappingURL=empleados.service.js.map