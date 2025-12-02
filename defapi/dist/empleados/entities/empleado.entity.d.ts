import { Turno } from "../enum/turno.enum";
import { Area } from "../enum/area.enum";
import { RegistroProduccion } from "./registro-produccion.entity";
import { RegistroAsistencia } from "./registro-asistencia.entity";
export declare class Empleado {
    id_empleado: number;
    produccion: RegistroProduccion[];
    asistencia: RegistroAsistencia[];
    nombre: string;
    apellido_p: string;
    apellido_m: string;
    area: Area;
    turno: Turno;
    salarioDiario: number;
    activo: boolean;
}
