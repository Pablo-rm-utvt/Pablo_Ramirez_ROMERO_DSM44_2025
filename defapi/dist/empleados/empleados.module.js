"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpleadosModule = void 0;
const common_1 = require("@nestjs/common");
const empleados_service_1 = require("./empleados.service");
const empleados_controller_1 = require("./empleados.controller");
const typeorm_1 = require("@nestjs/typeorm");
const empleado_entity_1 = require("./entities/empleado.entity");
const registro_asistencia_entity_1 = require("./entities/registro-asistencia.entity");
const registro_produccion_entity_1 = require("./entities/registro-produccion.entity");
let EmpleadosModule = class EmpleadosModule {
};
exports.EmpleadosModule = EmpleadosModule;
exports.EmpleadosModule = EmpleadosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                empleado_entity_1.Empleado,
                registro_asistencia_entity_1.RegistroAsistencia,
                registro_produccion_entity_1.RegistroProduccion
            ], "conexion-postgres")
        ],
        controllers: [empleados_controller_1.EmpleadosController],
        providers: [empleados_service_1.EmpleadosService],
    })
], EmpleadosModule);
//# sourceMappingURL=empleados.module.js.map