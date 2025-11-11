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
exports.TareaController = void 0;
const common_1 = require("@nestjs/common");
const tarea_service_1 = require("./tarea.service");
const create_tarea_dto_1 = require("./dto/create-tarea.dto");
const update_tarea_dto_1 = require("./dto/update-tarea.dto");
let TareaController = class TareaController {
    tareaService;
    constructor(tareaService) {
        this.tareaService = tareaService;
    }
    async create(creareTareaDto) {
        return await this.tareaService.create(creareTareaDto);
    }
    async update(id_tarea, updateTareaDto) {
        return await this.tareaService.update(id_tarea, updateTareaDto);
    }
    async findOne(id_tarea) {
        return await this.tareaService.findOne(id_tarea);
    }
    async findAll() {
        return await this.tareaService.findAll();
    }
    async remove(id_tarea) {
        return await this.tareaService.remove(id_tarea);
    }
};
exports.TareaController = TareaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tarea_dto_1.CreateTarea]),
    __metadata("design:returntype", Promise)
], TareaController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id_tarea'),
    __param(0, (0, common_1.Param)("id_tarea")),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_tarea_dto_1.UpdateTarea]),
    __metadata("design:returntype", Promise)
], TareaController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(":id_tarea"),
    __param(0, (0, common_1.Param)("id_tarea")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TareaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TareaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)(":id_tarea"),
    __param(0, (0, common_1.Param)("id_tarea")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TareaController.prototype, "remove", null);
exports.TareaController = TareaController = __decorate([
    (0, common_1.Controller)("tarea"),
    __metadata("design:paramtypes", [tarea_service_1.TareaService])
], TareaController);
//# sourceMappingURL=tarea.controller.js.map