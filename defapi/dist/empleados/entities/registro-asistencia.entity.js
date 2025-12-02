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
exports.RegistroAsistencia = void 0;
const typeorm_1 = require("typeorm");
const empleado_entity_1 = require("./empleado.entity");
const turno_enum_1 = require("../enum/turno.enum");
const status_turno_enum_1 = require("../enum/status-turno.enum");
let RegistroAsistencia = class RegistroAsistencia {
    id_reg_a;
    empleado;
    fecha;
    horaEntrada;
    horaSalida;
    puntual;
    horasTrabajadas;
    turno;
    estatus;
};
exports.RegistroAsistencia = RegistroAsistencia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id_reg_a" }),
    __metadata("design:type", Number)
], RegistroAsistencia.prototype, "id_reg_a", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empleado_entity_1.Empleado, (empleado) => empleado.asistencia),
    (0, typeorm_1.JoinColumn)({ name: "id_empleado" }),
    __metadata("design:type", empleado_entity_1.Empleado)
], RegistroAsistencia.prototype, "empleado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], RegistroAsistencia.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], RegistroAsistencia.prototype, "horaEntrada", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], RegistroAsistencia.prototype, "horaSalida", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], RegistroAsistencia.prototype, "puntual", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", nullable: true }),
    __metadata("design:type", Number)
], RegistroAsistencia.prototype, "horasTrabajadas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: turno_enum_1.Turno, default: turno_enum_1.Turno.MATUTINO }),
    __metadata("design:type", String)
], RegistroAsistencia.prototype, "turno", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: status_turno_enum_1.StatusTurno, default: status_turno_enum_1.StatusTurno.EN_TURNO }),
    __metadata("design:type", String)
], RegistroAsistencia.prototype, "estatus", void 0);
exports.RegistroAsistencia = RegistroAsistencia = __decorate([
    (0, typeorm_1.Entity)('RegistroAsistencia')
], RegistroAsistencia);
//# sourceMappingURL=registro-asistencia.entity.js.map