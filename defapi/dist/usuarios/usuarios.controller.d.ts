import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    login(updateUsuarioDto: UpdateUsuarioDto): Promise<false | import("./entities/usuario.entity").Usuario>;
    create(createUsuarioDto: CreateUsuarioDto): Promise<import("./entities/usuario.entity").Usuario>;
    update(id_user: number, updateUsuarioDto: UpdateUsuarioDto): Promise<import("typeorm").UpdateResult>;
    findAll(): Promise<import("./entities/usuario.entity").Usuario[]>;
    findOne(id_user: number): Promise<import("./entities/usuario.entity").Usuario[]>;
    remove(id_user: number): Promise<import("typeorm").DeleteResult>;
}
