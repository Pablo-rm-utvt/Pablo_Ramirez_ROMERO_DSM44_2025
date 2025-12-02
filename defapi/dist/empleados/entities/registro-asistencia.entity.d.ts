import { Empleado } from "./empleado.entity";
import { Turno } from "../enum/turno.enum";
import { StatusTurno } from "../enum/status-turno.enum";
export declare class RegistroAsistencia {
    id_reg_a: number;
    empleado: Empleado;
    fecha: Date;
    horaEntrada: Date;
    horaSalida: Date;
    puntual: boolean;
    horasTrabajadas: number;
    turno: Turno;
    estatus: StatusTurno;
}
