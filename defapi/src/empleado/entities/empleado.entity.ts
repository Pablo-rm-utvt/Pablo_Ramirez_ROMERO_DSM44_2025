import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Empleado {

    @PrimaryGeneratedColumn()
    id_empleado: number;

    @Column()
    nombre: string;

    @Column()
    curp: string;

    @Column()
    rfc: string;

    @Column()
    nss: string;

    @Column()
    fecha_nacimiento: string;

    @Column()
    direccion: string;

    @Column()
    telefono: string; // ← ahora string

    @Column()
    correo: string;

    @Column()
    cargo: string;

    @Column()
    area: string; // ← corregido

    @Column()
    fecha_ingreso: string;

    @Column()
    cuenta_bancaria: string; // ← ahora string

    @Column()
    contacto_exta: string; // ← ahora string

    @Column()
    estado_civil: string;

    @Column()
    estudios: string;

    @Column()
    foto_perfil: string;

    @Column()
    ine_anversa: string;

    @Column()
    ine_reverso: string;

    @Column()
    comprobante_domicilio: string;

    @Column()
    constancia_fiscal: string;

    @Column()
    acta_nacimiento: string;
}
