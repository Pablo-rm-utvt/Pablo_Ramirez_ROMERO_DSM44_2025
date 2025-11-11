import { Repository } from 'typeorm';
import { Empleado } from './entities/empleado.entity';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
export declare class EmpleadoService {
    private readonly empleadoRepository;
    constructor(empleadoRepository: Repository<Empleado>);
    create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado>;
    findAll(): Promise<Empleado[]>;
    findOne(id: number): Promise<Empleado>;
    update(id: number, updateEmpleadoDto: UpdateEmpleadoDto): Promise<Empleado>;
    remove(id: number): Promise<void>;
}
