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
exports.RegistroProduccion = void 0;
const typeorm_1 = require("typeorm");
const empleado_entity_1 = require("./empleado.entity");
const turno_enum_1 = require("../enum/turno.enum");
let RegistroProduccion = class RegistroProduccion {
    id_reg_p;
    empleado;
    fecha;
    turno;
    unidadesProducidas;
};
exports.RegistroProduccion = RegistroProduccion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "id_reg_p" }),
    __metadata("design:type", Number)
], RegistroProduccion.prototype, "id_reg_p", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empleado_entity_1.Empleado, (empleado) => empleado.produccion),
    (0, typeorm_1.JoinColumn)({ name: "id_empleado" }),
    __metadata("design:type", empleado_entity_1.Empleado)
], RegistroProduccion.prototype, "empleado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], RegistroProduccion.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: turno_enum_1.Turno, default: turno_enum_1.Turno.MATUTINO }),
    __metadata("design:type", String)
], RegistroProduccion.prototype, "turno", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], RegistroProduccion.prototype, "unidadesProducidas", void 0);
exports.RegistroProduccion = RegistroProduccion = __decorate([
    (0, typeorm_1.Entity)("RegistroProduccion")
], RegistroProduccion);
//# sourceMappingURL=registro-produccion.entity.js.map