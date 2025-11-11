import { ClinicaService } from './clinica.service';
import { CreateClinicaDto } from './dto/create-clinica.dto';
import { UpdateClinicaDto } from './dto/update-clinica.dto';
export declare class ClinicaController {
    private readonly clinicaMedicaService;
    constructor(clinicaMedicaService: ClinicaService);
    create(createClinicaMedicaDto: CreateClinicaDto): Promise<import("./entities/clinica.entity").Clinica>;
    findAll(nombrePaciente?: string): Promise<import("./entities/clinica.entity").Clinica[]>;
    getStats(): Promise<any>;
    findOne(id: number): Promise<import("./entities/clinica.entity").Clinica>;
    update(id: number, updateClinicaDto: UpdateClinicaDto): Promise<import("./entities/clinica.entity").Clinica>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
