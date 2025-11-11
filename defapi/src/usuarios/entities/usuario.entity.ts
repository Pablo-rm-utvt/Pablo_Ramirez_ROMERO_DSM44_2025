import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id_user: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ type: "text" })
    image: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    update: Date;
}