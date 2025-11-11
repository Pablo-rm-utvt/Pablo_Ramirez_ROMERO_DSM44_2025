import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe
} from "@nestjs/common";
import { ExamplesService } from "./examples.service";
import { CreateExampleDto } from "./dto/create-example.dto";
import { UpdateExampleDto } from "./dto/update-example.dto";

@Controller("tarea")
export class ExamplesController {
  constructor(
    private readonly tareaService: ExamplesService
  ) { }

  @Post()
  async create(@Body(new ValidationPipe) CreateExampleDto: CreateExampleDto) {
    return await this.tareaService.create(CreateExampleDto);
  }

  @Patch(':id_example')
  async update(@Param("id_example") id_tarea: number, @Body(new ValidationPipe()) updateTareaDto: UpdateExampleDto) {
    return await this.tareaService.update(id_tarea, updateTareaDto);
  }

  @Get(":id_example")
  async findOne(@Param("id_example") id_example: number) {
    return await this.tareaService.findOne(id_example);
  }

  @Get()
  async findAll() {
    return await this.tareaService.findAll();
  }

  @Delete(":id_example")
  async remove(@Param("id_example") id_example: number) {
    return await this.tareaService.remove(id_example);
  }
}