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
exports.ClinicaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const clinica_entity_1 = require("./entities/clinica.entity");
let ClinicaService = class ClinicaService {
    clinicaMedicaRepository;
    constructor(clinicaMedicaRepository) {
        this.clinicaMedicaRepository = clinicaMedicaRepository;
    }
    async create(createClinicaMedicaDto) {
        const nuevaHistoria = this.clinicaMedicaRepository.create(createClinicaMedicaDto);
        return await this.clinicaMedicaRepository.save(nuevaHistoria);
    }
    async findAll() {
        return await this.clinicaMedicaRepository.find({
            order: { fecha_ingreso: 'DESC' }
        });
    }
    async findOne(id) {
        const historia = await this.clinicaMedicaRepository.findOne({
            where: { id }
        });
        if (!historia) {
            throw new common_1.NotFoundException(`Historia clínica con ID ${id} no encontrada`);
        }
        return historia;
    }
    async findByPatientName(nombre) {
        return await this.clinicaMedicaRepository.find({
            where: {
                nombre_paciente: nombre
            },
            order: { fecha_ingreso: 'DESC' }
        });
    }
    async update(id, updateClinicaMedicaDto) {
        const historia = await this.findOne(id);
        Object.assign(historia, updateClinicaMedicaDto);
        return await this.clinicaMedicaRepository.save(historia);
    }
    async remove(id) {
        const historia = await this.findOne(id);
        await this.clinicaMedicaRepository.remove(historia);
        return { message: `Historia clínica del paciente eliminada correctamente` };
    }
    async getStats() {
        const total = await this.clinicaMedicaRepository.count();
        const porSexo = await this.clinicaMedicaRepository
            .createQueryBuilder('clinica')
            .select('clinica.sexo, COUNT(*) as cantidad')
            .groupBy('clinica.sexo')
            .getRawMany();
        const porGrupoSanguineo = await this.clinicaMedicaRepository
            .createQueryBuilder('clinica')
            .select('clinica.grupo_sanguineo, COUNT(*) as cantidad')
            .groupBy('clinica.grupo_sanguineo')
            .getRawMany();
        return {
            total_pacientes: total,
            distribucion_por_sexo: porSexo,
            distribucion_por_grupo_sanguineo: porGrupoSanguineo
        };
    }
};
exports.ClinicaService = ClinicaService;
exports.ClinicaService = ClinicaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(clinica_entity_1.Clinica)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClinicaService);
//# sourceMappingURL=clinica.service.js.map