import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Repository } from 'typeorm';
export declare class UsuariosService {
    private userRepository;
    constructor(userRepository: Repository<Usuario>);
    login(updateUsuarioDto: UpdateUsuarioDto): Promise<false | Usuario>;
    create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>;
    update(id_user: number, updateUsuarioDto: UpdateUsuarioDto): Promise<import("typeorm").UpdateResult>;
    findAll(): Promise<Usuario[]>;
    findOne(id_user: number): Promise<Usuario[]>;
    remove(id_user: number): Promise<import("typeorm").DeleteResult>;
}
