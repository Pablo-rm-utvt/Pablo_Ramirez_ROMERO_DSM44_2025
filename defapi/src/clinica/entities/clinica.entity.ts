import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Clinica {
    @PrimaryGeneratedColumn()
    id: number;

    // DATOS PRINCIPALES DEL PACIENTE
    @Column({ type: 'varchar', length: 255 })
    nombre_paciente: string;

    @Column({ type: 'int' })
    edad: number;

    @Column({ type: 'varchar', length: 20 })
    sexo: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    curp: string;

    @Column({ type: 'text', nullable: true })
    domicilio: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    telefono: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    correo_electronico: string;

    // INFORMACIÓN MÉDICA
    @Column({ type: 'timestamp', nullable: true })
    fecha_ingreso: Date;

    @Column({ type: 'text', nullable: true })
    diagnostico_inicial: string;

    @Column({ type: 'text', nullable: true })
    enfermedades_previas: string; // antecedentes médicos

    @Column({ type: 'text', nullable: true })
    medicamentos_actuales: string;

    @Column({ type: 'text', nullable: true })
    alergias: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    medico_asignado: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    area_internamiento: string;

    // SIGNOS VITALES
    @Column({ type: 'varchar', length: 20, nullable: true })
    presion_arterial: string;

    @Column({ type: 'int', nullable: true })
    frecuencia_cardiaca: number;

    @Column({ type: 'decimal', precision: 4, scale: 1, nullable: true })
    temperatura_corporal: number;

    @Column({ type: 'int', nullable: true })
    saturacion_oxigeno: number;

    // SEGUIMIENTO
    @Column({ type: 'text', nullable: true })
    notas_evolucion: string;

    @Column({ type: 'text', nullable: true })
    firma_medico: string;

    @Column({ type: 'timestamp', nullable: true })
    fecha_alta: Date;

    // IMÁGENES/ARCHIVOS (Base64 o URL)
    @Column({ type: 'text', nullable: true })
    foto_paciente: string;

    @Column({ type: 'text', nullable: true })
    radiografia_torax: string;

    @Column({ type: 'text', nullable: true })
    electrocardiograma: string;

    @Column({ type: 'text', nullable: true })
    analisis_sangre: string;

    @Column({ type: 'text', nullable: true })
    resonancia_magnetica: string;

    @Column({ type: 'text', nullable: true })
    tomografia: string;

    @Column({ type: 'text', nullable: true })
    foto_herida: string;
}
