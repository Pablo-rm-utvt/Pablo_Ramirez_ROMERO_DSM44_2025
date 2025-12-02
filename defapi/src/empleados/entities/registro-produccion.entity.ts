import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Empleado } from "./empleado.entity";
import { Turno } from "../enum/turno.enum";

@Entity("RegistroProduccion")
export class RegistroProduccion{
    @PrimaryGeneratedColumn({ name: "id_reg_p" })
    id_reg_p:           number;
    
    @ManyToOne( () => Empleado, (empleado) => empleado.produccion )
    @JoinColumn({ name: "id_empleado" })
    empleado:           Empleado;

    @Column({ type: "date" })
    fecha:              Date;

    @Column({ type: "enum", enum: Turno, default: Turno.MATUTINO })
    turno:              Turno;

    @Column({ type: "int", default: 0 })
    unidadesProducidas: number;
}
