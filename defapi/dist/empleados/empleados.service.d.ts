import { Repository } from 'typeorm';
import { Empleado } from './entities/empleado.entity';
import { RegistroAsistencia } from './entities/registro-asistencia.entity';
import { RegistroProduccion } from './entities/registro-produccion.entity';
import { CreateEmpleado } from './dto/create-empleado.dto';
import { UpdateEmpleado } from './dto/update-empleado.dto';
import { CreateRegistroAsistencia } from './dto/create-registro-asistencia.dto';
import { CreateRegistroProduccion } from './dto/create-registro-produccion.dto';
export declare class EmpleadosService {
    private readonly repoEmpleado;
    private readonly repoAsistencia;
    private readonly repoProduccion;
    constructor(repoEmpleado: Repository<Empleado>, repoAsistencia: Repository<RegistroAsistencia>, repoProduccion: Repository<RegistroProduccion>);
    private readonly horariosTurno;
    private convertirFecha;
    createRegistroAsistencia(data: CreateRegistroAsistencia): Promise<RegistroAsistencia>;
    createRegistroProduccion(data: CreateRegistroProduccion): Promise<RegistroProduccion>;
    createEmpleado(data: CreateEmpleado): Promise<Empleado>;
    findAllEmpleado(page: number | undefined, limit: number | undefined, baseUrl: string): Promise<{
        total: number;
        totalPages: number;
        prev: string | null;
        next: string | null;
        page: number;
        limit: number;
        data: Empleado[];
    }>;
    findOneEmpleado(id_empleado: number): Promise<Empleado>;
    updateEmpleado(id_empleado: number, data: UpdateEmpleado): Promise<import("typeorm").UpdateResult>;
    removeEmpleado(id_empleado: number): Promise<import("typeorm").DeleteResult>;
    createAistenciaEntrada(id_empleado: number): Promise<RegistroAsistencia>;
    updateAistenciaSalida(id_empleado: number): Promise<RegistroAsistencia>;
    createProduccion(id_empleado: number, unidadesProducidas: number): Promise<RegistroProduccion>;
    getAsistencia(id_empleado: number, fechaInicio: string, fechaFin: string): Promise<any>;
    getNomina(id_empleado: number, fechaInicio: string, fechaFin: string): Promise<{
        diasTrabajados: number;
        asistencias: RegistroAsistencia[];
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
        empleado: Promise<Empleado>;
        total: any[];
    }>;
}
