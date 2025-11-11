import { ExamplesService } from "./examples.service";
import { CreateExampleDto } from "./dto/create-example.dto";
import { UpdateExampleDto } from "./dto/update-example.dto";
export declare class ExamplesController {
    private readonly tareaService;
    constructor(tareaService: ExamplesService);
    create(CreateExampleDto: CreateExampleDto): Promise<import("./entities/example.entity").Example>;
    update(id_tarea: number, updateTareaDto: UpdateExampleDto): Promise<import("typeorm").UpdateResult>;
    findOne(id_example: number): Promise<import("./entities/example.entity").Example[]>;
    findAll(): Promise<import("./entities/example.entity").Example[]>;
    remove(id_example: number): Promise<import("typeorm").DeleteResult>;
}
