import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {

  constructor(
    private readonly usuariosService: UsuariosService
  ) { }

  @Post("login")
  async login(@Body(new ValidationPipe) updateUsuarioDto: UpdateUsuarioDto) {
    return await this.usuariosService.login(updateUsuarioDto);
  }

  @Post()
  async create(@Body(new ValidationPipe) createUsuarioDto: CreateUsuarioDto) {
    return await this.usuariosService.create(createUsuarioDto);
  }

  @Patch(':id_user')
  async update(@Param('id_user') id_user: number, @Body(new ValidationPipe) updateUsuarioDto: UpdateUsuarioDto) {
    return await this.usuariosService.update(id_user, updateUsuarioDto);
  }

  @Get()
  async findAll() {
    return await this.usuariosService.findAll();
  }

  @Get(':id_user')
  async findOne(@Param('id_user') id_user: number) {
    return await this.usuariosService.findOne(id_user);
  }

  @Delete(':id_user')
  async remove(@Param('id_user') id_user: number) {
    return await this.usuariosService.remove(id_user);
  }

}