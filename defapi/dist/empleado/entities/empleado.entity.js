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
exports.Empleado = void 0;
const typeorm_1 = require("typeorm");
let Empleado = class Empleado {
    id_empleado;
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
};
exports.Empleado = Empleado;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Empleado.prototype, "id_empleado", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Empleado.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Empleado.prototype, "curp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Empleado.prototype, "rfc", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Empleado.prototype, "nss", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Empleado.prototype, "fecha_nacimiento", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Empleado.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Empleado.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Empleado.prototype, "correo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Empleado.prototype, "cargo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Empleado.prototype, "area", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Empleado.prototype, "fecha_ingreso", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Empleado.prototype, "cuenta_bancaria", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Empleado.prototype, "contacto_exta", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Empleado.prototype, "estado_civil", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Empleado.prototype, "estudios", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Empleado.prototype, "foto_perfil", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Empleado.prototype, "ine_anversa", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Empleado.prototype, "ine_reverso", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Empleado.prototype, "comprobante_domicilio", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Empleado.prototype, "constancia_fiscal", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Empleado.prototype, "acta_nacimiento", void 0);
exports.Empleado = Empleado = __decorate([
    (0, typeorm_1.Entity)()
], Empleado);
//# sourceMappingURL=empleado.entity.js.map