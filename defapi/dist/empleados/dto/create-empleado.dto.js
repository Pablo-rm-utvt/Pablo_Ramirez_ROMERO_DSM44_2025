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
exports.CreateEmpleado = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const registro_asistencia_entity_1 = require("../entities/registro-asistencia.entity");
const registro_produccion_entity_1 = require("../entities/registro-produccion.entity");
const area_enum_1 = require("../enum/area.enum");
const turno_enum_1 = require("../enum/turno.enum");
class CreateEmpleado {
    nombre;
    apellido_p;
    apellido_m;
    area;
    turno;
    salarioDiario;
    activo;
    produccion;
    asistencia;
}
exports.CreateEmpleado = CreateEmpleado;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateEmpleado.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateEmpleado.prototype, "apellido_p", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateEmpleado.prototype, "apellido_m", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(area_enum_1.Area),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEmpleado.prototype, "area", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(turno_enum_1.Turno),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEmpleado.prototype, "turno", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateEmpleado.prototype, "salarioDiario", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateEmpleado.prototype, "activo", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => registro_produccion_entity_1.RegistroProduccion),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateEmpleado.prototype, "produccion", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => registro_asistencia_entity_1.RegistroAsistencia),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateEmpleado.prototype, "asistencia", void 0);
//# sourceMappingURL=create-empleado.dto.js.map