
export interface Empleados {
    total: number;
    totalPages: number;
    prev: null;
    next: string;
    page: number;
    limit: number;
    data: Datum[];
}


export interface Asistencia {
    id_reg_a: number;
    fecha: Date;
    horaEntrada: Date;
    horaSalida: Date;
    puntual: boolean;
    horasTrabajadas: number;
    turno: Turno;
    estatus: Estatus;
}


export interface Welcome {
    total: number;
    totalPages: number;
    prev: null;
    next: string;
    page: number;
    limit: number;
    data: Datum[];
}

export interface Datum {
    id_empleado: number;
    produccion: Produccion[];
    asistencia: Asistencia[];
    nombre: string;
    apellido_p: string;
    apellido_m: string;
    area: Area;
    turno: Turno;
    salarioDiario: string;
    activo: boolean;
}

export interface Produccion {
    id_reg_p: number;
    fecha: Date;
    turno: Turno;
    unidadesProducidas: number;
}

export interface CreateEmpleadoDto {
    id_empleado: number;
    produccion: Produccion[];
    asistencia: Asistencia[];
    nombre: string;
    apellido_p: string;
    apellido_m: string;
    apellido?: string;
    area: Area;
    turno: Turno;
    salarioDiario: string;
    activo: boolean;
}

export interface ReporteAsistencia {
    total: number;
    data: AsistenciaItem[];
}

export interface AsistenciaItem {
    a_id_reg_a: number;
    a_fecha: string;
    a_horaEntrada: string;
    a_horaSalida: string;
    a_turno: string;
    e_id_empleado: number;
    e_nombre: string;
    e_apellido_p: string;
    e_apellido_m: string;
}

export interface AsistenciaEmpleado {
    total_asistencias: string;
}

export interface Nomina {
    diasTrabajados: number;
    asistencias: Asistencia[];
    total: number;
}

export interface DiasTrabajados {
    a_id_reg_a: number;
    a_fecha: string;
    a_horaEntrada: string;
    a_horaSalida: string;
}

export interface ReporteProduccion {
    p_id_reg_p: number;
    p_fecha: string;
    p_turno: string;
    p_unidadesProducidas: number;
    e_id_empleado: number;
    e_nombre: string;
    e_apellido_p: string;
    e_apellido_m: string;
}

export interface HorasTrabajadas {
    a_id_reg_a: number;
    a_fecha: string;
    a_horasTrabajadas: number;
    a_turno: string;
    e_nombre: string;
    e_apellido_p: string;
    e_apellido_m: string;
}

export interface UnidadesProducidas {
    empleado: any;
    total: UnidadProducida[];
}

export interface UnidadProducida {
    total_producido: string;
}
export enum Area {
    Inventario = "INVENTARIO",
    Oficina = "OFICINA",
    Produccion = "PRODUCCION",
}

export interface Asistencia {
    id_reg_a: number;
    fecha: Date;
    horaEntrada: Date;
    horaSalida: Date;
    puntual: boolean;
    horasTrabajadas: number;
    turno: Turno;
    estatus: Estatus;
}

export enum Estatus {
    EnTurno = "EN_TURNO",
}

export enum Turno {
    Matutino = "MATUTINO",
    Mixto = "MIXTO",
    Nocturno = "NOCTURNO",
    Vespertino = "VESPERTINO",
}

export interface Produccion {
    id_reg_p: number;
    fecha: Date;
    turno: Turno;
    unidadesProducidas: number;
}
export class Convert {
    public static toWelcome(json: string): Welcome {
        return JSON.parse(json);
    }

    public static welcomeToJson(value: Welcome): string {
        return JSON.stringify(value);
    }
}
