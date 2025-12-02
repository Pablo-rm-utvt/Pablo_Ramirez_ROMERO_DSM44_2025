import { Turno } from '../enum/turno.enum';
import { StatusTurno } from '../enum/status-turno.enum';
export declare class CreateRegistroAsistencia {
    id_empleado?: number;
    fecha: string;
    horaEntrada: string;
    horaSalida: string;
    puntual: boolean;
    horasTrabajadas: number;
    turno: Turno;
    estatus: StatusTurno;
}
