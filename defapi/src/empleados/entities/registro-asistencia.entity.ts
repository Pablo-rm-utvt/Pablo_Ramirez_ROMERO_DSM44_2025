import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Empleado } from "./empleado.entity";
import { Turno } from "../enum/turno.enum";
import { StatusTurno } from "../enum/status-turno.enum";

@Entity('RegistroAsistencia')
export class RegistroAsistencia {
    @PrimaryGeneratedColumn({ name: "id_reg_a" })
    id_reg_a:           number;

    @ManyToOne( () => Empleado, (empleado) => empleado.asistencia )
    @JoinColumn({ name: "id_empleado" })
    empleado:           Empleado;

    @Column({ type: "date" })
    fecha:              Date;

    @Column({ type: "timestamp" })
    horaEntrada:        Date;

    @Column({ type: "timestamp" })
    horaSalida:        Date;

    @Column({ default: true })
    puntual:        boolean;

    @Column({ type: "float", nullable: true })
    horasTrabajadas: number;

    @Column({ type: "enum", enum: Turno, default: Turno.MATUTINO })
    turno:              Turno;

    @Column({ type: "enum", enum: StatusTurno, default: StatusTurno.EN_TURNO })
    estatus: StatusTurno;
}
