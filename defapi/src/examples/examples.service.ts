import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Example } from './entities/example.entity';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class ExamplesService {

  constructor(
    @InjectRepository(Example)
    private ExampleRepository: Repository<Example>
  ) { }

  async login(UpdateExampleDto: UpdateExampleDto) {
    try {
      const user: Example | null = await this.ExampleRepository.findOneBy({ correo_example: UpdateExampleDto.correo_example });

      if (!user) {
        return false;
      }

      return (await bcrypt.compare(UpdateExampleDto.proveedor_example, user.proveedor_example)) ? user : false;
    } catch (error) {

      return false;
    }
  }

  async create(CreateExampleDto: CreateExampleDto) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(CreateExampleDto.proveedor_example, saltOrRounds);
    const register = { ...CreateExampleDto, password: hash };
    const new_user = this.ExampleRepository.create(register);
    return await this.ExampleRepository.save(new_user);
  }

  async update(id_example: number, UpdateExampleDto: UpdateExampleDto) {
    (UpdateExampleDto.proveedor_example) && (async () => {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(UpdateExampleDto.proveedor_example, saltOrRounds);
      const register = { ...UpdateExampleDto, proveedor_example: hash };
      return await this.ExampleRepository.update(id_example, register);
    })();

    return await this.ExampleRepository.update(id_example, UpdateExampleDto);
  }

  async findAll() {
    return await this.ExampleRepository.find();
  }

  async findOne(id_example: number) {
    return await this.ExampleRepository.findBy({ id_example });
  }

  async remove(id_example: number) {
    return await this.ExampleRepository.delete(id_example);
  }
}