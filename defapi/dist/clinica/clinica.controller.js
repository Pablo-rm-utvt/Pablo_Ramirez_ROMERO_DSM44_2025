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
exports.ClinicaController = void 0;
const common_1 = require("@nestjs/common");
const clinica_service_1 = require("./clinica.service");
const create_clinica_dto_1 = require("./dto/create-clinica.dto");
const update_clinica_dto_1 = require("./dto/update-clinica.dto");
let ClinicaController = class ClinicaController {
    clinicaMedicaService;
    constructor(clinicaMedicaService) {
        this.clinicaMedicaService = clinicaMedicaService;
    }
    create(createClinicaMedicaDto) {
        return this.clinicaMedicaService.create(createClinicaMedicaDto);
    }
    findAll(nombrePaciente) {
        if (nombrePaciente) {
            return this.clinicaMedicaService.findByPatientName(nombrePaciente);
        }
        return this.clinicaMedicaService.findAll();
    }
    getStats() {
        return this.clinicaMedicaService.getStats();
    }
    findOne(id) {
        return this.clinicaMedicaService.findOne(id);
    }
    update(id, updateClinicaDto) {
        return this.clinicaMedicaService.update(id, updateClinicaDto);
    }
    remove(id) {
        return this.clinicaMedicaService.remove(id);
    }
};
exports.ClinicaController = ClinicaController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_clinica_dto_1.CreateClinicaDto]),
    __metadata("design:returntype", void 0)
], ClinicaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('paciente')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClinicaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClinicaController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ClinicaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_clinica_dto_1.UpdateClinicaDto]),
    __metadata("design:returntype", void 0)
], ClinicaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ClinicaController.prototype, "remove", null);
exports.ClinicaController = ClinicaController = __decorate([
    (0, common_1.Controller)('clinica'),
    __metadata("design:paramtypes", [clinica_service_1.ClinicaService])
], ClinicaController);
//# sourceMappingURL=clinica.controller.js.map