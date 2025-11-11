import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empleado } from './entities/empleado.entity';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';

@Injectable()
export class EmpleadoService {
  constructor(
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,
  ) {}

  async create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
    const empleado = this.empleadoRepository.create(createEmpleadoDto as any);
    const saved = await this.empleadoRepository.save(empleado as any);
    return saved as Empleado;
  }

  async findAll(): Promise<Empleado[]> {
    return this.empleadoRepository.find();
  }

  async findOne(id: number): Promise<Empleado> {
    const empleado = await this.empleadoRepository.findOneBy({ id_empleado: id });
    if (!empleado) throw new NotFoundException(`Empleado #${id} not found`);
    return empleado;
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto): Promise<Empleado> {
    const empleado = await this.empleadoRepository.preload({
      id_empleado: id,
      ...updateEmpleadoDto,
    } as any);
    if (!empleado) throw new NotFoundException(`Empleado #${id} not found`);
    const saved = await this.empleadoRepository.save(empleado as any);
    return saved as Empleado;
  }

  async remove(id: number): Promise<void> {
    const result = await this.empleadoRepository.delete({ id_empleado: id });
    if (result.affected === 0) throw new NotFoundException(`Empleado #${id} not found`);
  }
}
