import { Empleado } from "./empleado.entity";
import { Turno } from "../enum/turno.enum";
export declare class RegistroProduccion {
    id_reg_p: number;
    empleado: Empleado;
    fecha: Date;
    turno: Turno;
    unidadesProducidas: number;
}
