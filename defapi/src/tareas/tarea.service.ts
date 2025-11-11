import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tarea } from "./entities/tarea.entity";
import { CreateTarea } from "./dto/create-tarea.dto";
import { UpdateTarea } from "./dto/update-tarea.dto";

@Injectable()
export class TareaService {
    constructor(
        @InjectRepository(Tarea)
        private tareaRepository: Repository<Tarea>
    ) { }

    async create(createTareaDto: CreateTarea) {
        const register = this.tareaRepository.create(createTareaDto)
        return await this.tareaRepository.save(register);
    }

    async update(id_tarea: number, updateTareaDto: UpdateTarea) {
        return await this.tareaRepository.update(id_tarea, updateTareaDto);
    }

    async findOne(id_tarea: number) {
        return await this.tareaRepository.findBy({ id_tarea });
    }

    async findAll() {
        return await this.tareaRepository.find();
    }

    async remove(id_tarea: number) {
        return await this.tareaRepository.delete(id_tarea);
    }
}