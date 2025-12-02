import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Paciente } from './paciente.entity';
import { EstatusCita } from '../enum/estatus-cita.enum';

@Entity('citas')
export class Cita {
    @PrimaryGeneratedColumn()
    id_cita: number;

    @Column()
    id_paciente: number;

    @Column({ type: 'date' })
    fecha: Date;

    @Column({ type: 'time' })
    hora: string;

    @Column({ type: 'varchar', length: 255 })
    motivo: string;

    @Column({ type: 'varchar', length: 100 })
    medico_asignado: string;

    @Column({ 
        type: 'enum', 
        enum: EstatusCita,
        default: EstatusCita.PROGRAMADA 
    })
    estatus: EstatusCita;

    @ManyToOne(() => Paciente, (paciente) => paciente.citas, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_paciente' })
    paciente: Paciente;
}
