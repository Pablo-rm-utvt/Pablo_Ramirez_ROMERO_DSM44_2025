
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Example {
    @PrimaryGeneratedColumn()
    id_example: number;

    @Column()
    correo_example: string;
    @Column()
    nota_example: string;
    @Column()
    ciudad_example: string;
    @Column()
    proveedor_example: string;
    @Column()
    prioridad_example: number;


    @Column({ type: "text" })
    image1_example: string;
    @Column({ type: "text" })
    image2_example: string;
    @Column({ type: "text" })
    image3_example: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    update: Date;

}


