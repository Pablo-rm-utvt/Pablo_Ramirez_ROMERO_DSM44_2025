import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario)
    private userRepository: Repository<Usuario>
  ) { }

  async login(updateUsuarioDto: UpdateUsuarioDto) {
    try {
      const user: Usuario | null = await this.userRepository.findOneBy({ email: updateUsuarioDto.email });

      if (!user) {
        return false;
      }

      return (await bcrypt.compare(updateUsuarioDto.password, user.password)) ? user : false;
    } catch (error) {

      return false;
    }
  }

  async create(createUsuarioDto: CreateUsuarioDto) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUsuarioDto.password, saltOrRounds);
    const register = { ...createUsuarioDto, password: hash };
    const new_user = this.userRepository.create(register);
    return await this.userRepository.save(new_user);
  }

  async update(id_user: number, updateUsuarioDto: UpdateUsuarioDto) {
    (updateUsuarioDto.password) && (async () => {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(updateUsuarioDto.password, saltOrRounds);
      const register = { ...updateUsuarioDto, password: hash };
      return await this.userRepository.update(id_user, register);
    })();

    return await this.userRepository.update(id_user, updateUsuarioDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id_user: number) {
    return await this.userRepository.findBy({ id_user });
  }

  async remove(id_user: number) {
    return await this.userRepository.delete(id_user);
  }
}