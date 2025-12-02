import { EmpleadosService } from './empleados.service';
import { CreateEmpleado } from './dto/create-empleado.dto';
import { UpdateEmpleado } from './dto/update-empleado.dto';
import * as express from 'express';
import { CreateRegistroAsistencia } from './dto/create-registro-asistencia.dto';
import { CreateRegistroProduccion } from './dto/create-registro-produccion.dto';
export declare class EmpleadosController {
    private readonly empleadosService;
    constructor(empleadosService: EmpleadosService);
    createEmpleado(data: CreateEmpleado): Promise<import("./entities/empleado.entity").Empleado>;
    asistencia(data: CreateRegistroAsistencia): Promise<import("./entities/registro-asistencia.entity").RegistroAsistencia>;
    produccion(data: CreateRegistroProduccion): Promise<import("./entities/registro-produccion.entity").RegistroProduccion>;
    getAsistencia(id_empleado: number, fechaInicio: string, fechaFin: string): Promise<any>;
    getNomina(id_empleado: number, fechaInicio: string, fechaFin: string): Promise<{
        diasTrabajados: number;
        asistencias: import("./entities/registro-asistencia.entity").RegistroAsistencia[];
        total: number;
    }>;
    getDiasTrabajados(id_empleado: number, fechaInicio: string, fechaFin: string): Promise<any[]>;
    getReporteAsistencia(id_empleado: number, fechaInicio: string, fechaFin: string): Promise<{
        total: number;
        data: any[];
    }>;
    getReporteProduccion(id_empleado: number, fechaInicio: string, fechaFin: string): Promise<any[]>;
    getReporteHorasTrabajadas(id_empleado: number, fechaInicio: string, fechaFin: string): Promise<any[]>;
    getProduccionTotal(id_empleado: number, fechaInicio: string, fechaFin: string): Promise<{
        empleado: Promise<import("./entities/empleado.entity").Empleado>;
        total: any[];
    }>;
    findAll(page: number | undefined, limit: number | undefined, req: express.Request): Promise<{
        total: number;
        totalPages: number;
        prev: string | null;
        next: string | null;
        page: number;
        limit: number;
        data: import("./entities/empleado.entity").Empleado[];
    }>;
    findOne(id_empleado: number): Promise<import("./entities/empleado.entity").Empleado>;
    update(id_empleado: number, data: UpdateEmpleado): Promise<import("typeorm").UpdateResult>;
    remove(id_empleado: number): Promise<import("typeorm").DeleteResult>;
    createAistenciaEntrada(id_empleado: number): any;
    updateAistenciaSalida(id_empleado: number): any;
    createProduccion(id_empleado: number, unidadesProducidas: number): any;
}
