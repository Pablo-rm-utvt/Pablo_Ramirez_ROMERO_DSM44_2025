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
exports.CreateRegistroAsistencia = void 0;
const class_validator_1 = require("class-validator");
const turno_enum_1 = require("../enum/turno.enum");
const status_turno_enum_1 = require("../enum/status-turno.enum");
class CreateRegistroAsistencia {
    id_empleado;
    fecha;
    horaEntrada;
    horaSalida;
    puntual;
    horasTrabajadas;
    turno;
    estatus;
}
exports.CreateRegistroAsistencia = CreateRegistroAsistencia;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateRegistroAsistencia.prototype, "id_empleado", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateRegistroAsistencia.prototype, "fecha", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateRegistroAsistencia.prototype, "horaEntrada", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateRegistroAsistencia.prototype, "horaSalida", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateRegistroAsistencia.prototype, "puntual", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateRegistroAsistencia.prototype, "horasTrabajadas", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(turno_enum_1.Turno),
    __metadata("design:type", String)
], CreateRegistroAsistencia.prototype, "turno", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(status_turno_enum_1.StatusTurno),
    __metadata("design:type", String)
], CreateRegistroAsistencia.prototype, "estatus", void 0);
//# sourceMappingURL=create-registro-asistencia.dto.js.map