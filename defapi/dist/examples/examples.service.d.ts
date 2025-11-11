import { Example } from './entities/example.entity';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import { Repository } from 'typeorm';
export declare class ExamplesService {
    private ExampleRepository;
    constructor(ExampleRepository: Repository<Example>);
    login(UpdateExampleDto: UpdateExampleDto): Promise<false | Example>;
    create(CreateExampleDto: CreateExampleDto): Promise<Example>;
    update(id_example: number, UpdateExampleDto: UpdateExampleDto): Promise<import("typeorm").UpdateResult>;
    findAll(): Promise<Example[]>;
    findOne(id_example: number): Promise<Example[]>;
    remove(id_example: number): Promise<import("typeorm").DeleteResult>;
}
