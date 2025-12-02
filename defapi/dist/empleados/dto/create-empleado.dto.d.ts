import { RegistroAsistencia } from "../entities/registro-asistencia.entity";
import { RegistroProduccion } from "../entities/registro-produccion.entity";
import { Area } from "../enum/area.enum";
import { Turno } from "../enum/turno.enum";
export declare class CreateEmpleado {
    nombre: string;
    apellido_p: string;
    apellido_m: string;
    area: Area;
    turno: Turno;
    salarioDiario: number;
    activo: boolean;
    produccion?: RegistroProduccion[];
    asistencia?: RegistroAsistencia[];
}
