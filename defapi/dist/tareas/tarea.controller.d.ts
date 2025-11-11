import { TareaService } from "./tarea.service";
import { CreateTarea } from "./dto/create-tarea.dto";
import { UpdateTarea } from "./dto/update-tarea.dto";
export declare class TareaController {
    private readonly tareaService;
    constructor(tareaService: TareaService);
    create(creareTareaDto: CreateTarea): Promise<import("./entities/tarea.entity").Tarea>;
    update(id_tarea: number, updateTareaDto: UpdateTarea): Promise<import("typeorm").UpdateResult>;
    findOne(id_tarea: number): Promise<import("./entities/tarea.entity").Tarea[]>;
    findAll(): Promise<import("./entities/tarea.entity").Tarea[]>;
    remove(id_tarea: number): Promise<import("typeorm").DeleteResult>;
}
