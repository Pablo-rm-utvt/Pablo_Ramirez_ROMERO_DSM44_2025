import { Repository } from 'typeorm';
import { Clinica } from './entities/clinica.entity';
import { CreateClinicaDto } from './dto/create-clinica.dto';
import { UpdateClinicaDto } from './dto/update-clinica.dto';
export declare class ClinicaService {
    private readonly clinicaMedicaRepository;
    constructor(clinicaMedicaRepository: Repository<Clinica>);
    create(createClinicaMedicaDto: CreateClinicaDto): Promise<Clinica>;
    findAll(): Promise<Clinica[]>;
    findOne(id: number): Promise<Clinica>;
    findByPatientName(nombre: string): Promise<Clinica[]>;
    update(id: number, updateClinicaMedicaDto: UpdateClinicaDto): Promise<Clinica>;
    remove(id: number): Promise<{
        message: string;
    }>;
    getStats(): Promise<any>;
}
