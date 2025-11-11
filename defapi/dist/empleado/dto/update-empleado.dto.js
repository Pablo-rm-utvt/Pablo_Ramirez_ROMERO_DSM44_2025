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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmpleadoDto = void 0;
const class_validator_1 = require("class-validator");
class UpdateEmpleadoDto {
    nombre;
    curp;
    rfc;
    nss;
    fecha_nacimiento;
    direccion;
    telefono;
    correo;
    cargo;
    area;
    fecha_ingreso;
    cuenta_bancaria;
    contacto_exta;
    estado_civil;
    estudios;
    foto_perfil;
    ine_anversa;
    ine_reverso;
    comprobante_domicilio;
    constancia_fiscal;
    acta_nacimiento;
}
exports.UpdateEmpleadoDto = UpdateEmpleadoDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.MinLength)(4),
    __metadata("design:type", String)
], UpdateEmpleadoDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(19),
    (0, class_validator_1.MinLength)(19),
    __metadata("design:type", String)
], UpdateEmpleadoDto.prototype, "curp", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.MinLength)(4),
    __metadata("design:type", String)
], UpdateEmpleadoDto.prototype, "rfc", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.MinLength)(4),
    __metadata("design:type", String)
], UpdateEmpleadoDto.prototype, "nss", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEmpleadoDto.prototype, "fecha_nacimiento", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.MinLength)(4),
    __metadata("design:type", String)
], UpdateEmpleadoDto.prototype, "direccion", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], UpdateEmpleadoDto.prototype, "telefono", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateEmpleadoDto.prototype, "correo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.MinLength)(4),
    __metadata("design:type", String)
], UpdateEmpleadoDto.prototype, "cargo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.MinLength)(4),
    __metadata("design:type", String)
], UpdateEmpleadoDto.prototype, "area", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEmpleadoDto.prototype, "fecha_ingreso", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(16),
    __metadata("design:type", String)
], UpdateEmpleadoDto.prototype, "cuenta_bancaria", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], UpdateEmpleadoDto.prototype, "contacto_exta", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.MinLength)(4),
    __metadata("design:type", String)
], UpdateEmpleadoDto.prototype, "estado_civil", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.MinLength)(4),
    __metadata("design:type", String)
], UpdateEmpleadoDto.prototype, "estudios", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEmpleadoDto.prototype, "foto_perfil", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEmpleadoDto.prototype, "ine_anversa", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEmpleadoDto.prototype, "ine_reverso", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEmpleadoDto.prototype, "comprobante_domicilio", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEmpleadoDto.prototype, "constancia_fiscal", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEmpleadoDto.prototype, "acta_nacimiento", void 0);
//# sourceMappingURL=update-empleado.dto.js.map