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
exports.UsuariosController = void 0;
const common_1 = require("@nestjs/common");
const usuarios_service_1 = require("./usuarios.service");
const create_usuario_dto_1 = require("./dto/create-usuario.dto");
const update_usuario_dto_1 = require("./dto/update-usuario.dto");
let UsuariosController = class UsuariosController {
    usuariosService;
    constructor(usuariosService) {
        this.usuariosService = usuariosService;
    }
    async login(updateUsuarioDto) {
        return await this.usuariosService.login(updateUsuarioDto);
    }
    async create(createUsuarioDto) {
        return await this.usuariosService.create(createUsuarioDto);
    }
    async update(id_user, updateUsuarioDto) {
        return await this.usuariosService.update(id_user, updateUsuarioDto);
    }
    async findAll() {
        return await this.usuariosService.findAll();
    }
    async findOne(id_user) {
        return await this.usuariosService.findOne(id_user);
    }
    async remove(id_user) {
        return await this.usuariosService.remove(id_user);
    }
};
exports.UsuariosController = UsuariosController;
__decorate([
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_usuario_dto_1.UpdateUsuarioDto]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "login", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_usuario_dto_1.CreateUsuarioDto]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id_user'),
    __param(0, (0, common_1.Param)('id_user')),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_usuario_dto_1.UpdateUsuarioDto]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id_user'),
    __param(0, (0, common_1.Param)('id_user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id_user'),
    __param(0, (0, common_1.Param)('id_user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "remove", null);
exports.UsuariosController = UsuariosController = __decorate([
    (0, common_1.Controller)('usuarios'),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService])
], UsuariosController);
//# sourceMappingURL=usuarios.controller.js.map