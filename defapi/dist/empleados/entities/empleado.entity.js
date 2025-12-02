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
const turno_enum_1 = require("../enum/turno.enum");
const area_enum_1 = require("../enum/area.enum");
const registro_produccion_entity_1 = require("./registro-produccion.entity");
const registro_asistencia_entity_1 = require("./registro-asistencia.entity");
let Empleado = class Empleado {
    id_empleado;
    produccion;
    asistencia;
    nombre;
    apellido_p;
    apellido_m;
    area;
    turno;
    salarioDiario;
    activo;
};
exports.Empleado = Empleado;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id_empleado" }),
    __metadata("design:type", Number)
], Empleado.prototype, "id_empleado", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => registro_produccion_entity_1.RegistroProduccion, (produccion) => produccion.empleado, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: "id_empleado" }),
    __metadata("design:type", Array)
], Empleado.prototype, "produccion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => registro_asistencia_entity_1.RegistroAsistencia, (asistencia) => asistencia.empleado, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: "id_empleado" }),
    __metadata("design:type", Array)
], Empleado.prototype, "asistencia", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Empleado.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Empleado.prototype, "apellido_p", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Empleado.prototype, "apellido_m", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: area_enum_1.Area, default: area_enum_1.Area.PRODUCCION }),
    __metadata("design:type", String)
], Empleado.prototype, "area", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: turno_enum_1.Turno, default: turno_enum_1.Turno.MATUTINO }),
    __metadata("design:type", String)
], Empleado.prototype, "turno", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', nullable: true }),
    __metadata("design:type", Number)
], Empleado.prototype, "salarioDiario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Empleado.prototype, "activo", void 0);
exports.Empleado = Empleado = __decorate([
    (0, typeorm_1.Entity)("Empleado")
], Empleado);
//# sourceMappingURL=empleado.entity.js.map