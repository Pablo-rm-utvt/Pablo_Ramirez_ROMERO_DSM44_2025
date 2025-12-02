import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cita } from './cita.entity';
import { Tratamiento } from './tratamiento.entity';

@Entity('pacientes')
export class Paciente {
    @PrimaryGeneratedColumn()
    id_paciente: number;

    @Column({ type: 'varchar', length: 100 })
    nombre: string;

    @Column({ type: 'varchar', length: 100 })
    apellido: string;

    @Column({ type: 'date' })
    fecha_nacimiento: Date;

    @Column({ type: 'varchar', length: 10 })
    sexo: string;

    @Column({ type: 'varchar', length: 20 })
    telefono: string;

    @Column({ type: 'varchar', length: 255 })
    direccion: string;

    @Column({ type: 'varchar', length: 5 })
    tipo_sangre: string;

    @Column({ type: 'text', nullable: true })
    alergias: string;

    @Column({ type: 'boolean', default: true })
    activo: boolean;

    @OneToMany(() => Cita, (cita) => cita.paciente)
    citas: Cita[];

    @OneToMany(() => Tratamiento, (tratamiento) => tratamiento.paciente)
    tratamientos: Tratamiento[];
}
