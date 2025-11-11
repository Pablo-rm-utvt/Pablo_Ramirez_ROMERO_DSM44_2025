import { EmpleadoService } from './empleado.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
export declare class EmpleadoController {
    private readonly empleadoService;
    constructor(empleadoService: EmpleadoService);
    create(createEmpleadoDto: CreateEmpleadoDto): Promise<import("./entities/empleado.entity").Empleado>;
    findAll(): Promise<import("./entities/empleado.entity").Empleado[]>;
    findOne(id: number): Promise<import("./entities/empleado.entity").Empleado>;
    update(id: number, updateEmpleadoDto: UpdateEmpleadoDto): Promise<import("./entities/empleado.entity").Empleado>;
    remove(id: number): Promise<void>;
}
