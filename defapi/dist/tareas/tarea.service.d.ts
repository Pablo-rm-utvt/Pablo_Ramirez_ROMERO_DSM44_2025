import { Repository } from "typeorm";
import { Tarea } from "./entities/tarea.entity";
import { CreateTarea } from "./dto/create-tarea.dto";
import { UpdateTarea } from "./dto/update-tarea.dto";
export declare class TareaService {
    private tareaRepository;
    constructor(tareaRepository: Repository<Tarea>);
    create(createTareaDto: CreateTarea): Promise<Tarea>;
    update(id_tarea: number, updateTareaDto: UpdateTarea): Promise<import("typeorm").UpdateResult>;
    findOne(id_tarea: number): Promise<Tarea[]>;
    findAll(): Promise<Tarea[]>;
    remove(id_tarea: number): Promise<import("typeorm").DeleteResult>;
}
