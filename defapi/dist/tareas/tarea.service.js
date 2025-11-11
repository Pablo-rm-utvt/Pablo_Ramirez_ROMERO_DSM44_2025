"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TareaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tarea_entity_1 = require("./entities/tarea.entity");
let TareaService = class TareaService {
    tareaRepository;
    constructor(tareaRepository) {
        this.tareaRepository = tareaRepository;
    }
    async create(createTareaDto) {
        const register = this.tareaRepository.create(createTareaDto);
        return await this.tareaRepository.save(register);
    }
    async update(id_tarea, updateTareaDto) {
        return await this.tareaRepository.update(id_tarea, updateTareaDto);
    }
    async findOne(id_tarea) {
        return await this.tareaRepository.findBy({ id_tarea });
    }
    async findAll() {
        return await this.tareaRepository.find();
    }
    async remove(id_tarea) {
        return await this.tareaRepository.delete(id_tarea);
    }
};
exports.TareaService = TareaService;
exports.TareaService = TareaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tarea_entity_1.Tarea)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TareaService);
//# sourceMappingURL=tarea.service.js.map