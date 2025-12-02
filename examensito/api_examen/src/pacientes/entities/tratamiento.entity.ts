import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Paciente } from './paciente.entity';

@Entity('tratamientos')
export class Tratamiento {
    @PrimaryGeneratedColumn()
    id_tratamiento: number;

    @Column()
    id_paciente: number;

    @Column({ type: 'varchar', length: 255 })
    diagnostico: string;

    @Column({ type: 'varchar', length: 255 })
    medicamento: string;

    @Column({ type: 'varchar', length: 100 })
    dosis: string;

    @Column({ type: 'date' })
    fecha_inicio: Date;

    @Column({ type: 'date', nullable: true })
    fecha_fin: Date;

    @Column({ type: 'text', nullable: true })
    notas: string;

    @ManyToOne(() => Paciente, (paciente) => paciente.tratamientos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_paciente' })
    paciente: Paciente;
}
