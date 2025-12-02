"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpleadosController = void 0;
const common_1 = require("@nestjs/common");
const empleados_service_1 = require("./empleados.service");
const create_empleado_dto_1 = require("./dto/create-empleado.dto");
const update_empleado_dto_1 = require("./dto/update-empleado.dto");
const express = __importStar(require("express"));
const create_registro_asistencia_dto_1 = require("./dto/create-registro-asistencia.dto");
const create_registro_produccion_dto_1 = require("./dto/create-registro-produccion.dto");
let EmpleadosController = class EmpleadosController {
    empleadosService;
    constructor(empleadosService) {
        this.empleadosService = empleadosService;
    }
    createEmpleado(data) {
        return this.empleadosService.createEmpleado(data);
    }
    asistencia(data) {
        return this.empleadosService.createRegistroAsistencia(data);
    }
    produccion(data) {
        return this.empleadosService.createRegistroProduccion(data);
    }
    getAsistencia(id_empleado, fechaInicio, fechaFin) {
        return this.empleadosService.getAsistencia(id_empleado, fechaInicio, fechaFin);
    }
    getNomina(id_empleado, fechaInicio, fechaFin) {
        return this.empleadosService.getNomina(id_empleado, fechaInicio, fechaFin);
    }
    getDiasTrabajados(id_empleado, fechaInicio, fechaFin) {
        return this.empleadosService.getDiasTrabajados(id_empleado, fechaInicio, fechaFin);
    }
    getReporteAsistencia(id_empleado, fechaInicio, fechaFin) {
        return this.empleadosService.getReporteAsistencia(id_empleado, fechaInicio, fechaFin);
    }
    getReporteProduccion(id_empleado, fechaInicio, fechaFin) {
        return this.empleadosService.getReporteProduccion(id_empleado, fechaInicio, fechaFin);
    }
    getReporteHorasTrabajadas(id_empleado, fechaInicio, fechaFin) {
        return this.empleadosService.getReporteHorasTrabajadas(id_empleado, fechaInicio, fechaFin);
    }
    getProduccionTotal(id_empleado, fechaInicio, fechaFin) {
        return this.empleadosService.getProduccionTotal(id_empleado, fechaInicio, fechaFin);
    }
    async findAll(page = 1, limit = 10, req) {
        const baseUrl = `${req.protocol}://${req.host}${req.baseUrl}/api/empleados`;
        return this.empleadosService.findAllEmpleado(Number(page), Number(limit), baseUrl);
    }
    findOne(id_empleado) {
        return this.empleadosService.findOneEmpleado(id_empleado);
    }
    update(id_empleado, data) {
        return this.empleadosService.updateEmpleado(id_empleado, data);
    }
    remove(id_empleado) {
        return this.empleadosService.removeEmpleado(id_empleado);
    }
    createAistenciaEntrada(id_empleado) {
        return this.createAistenciaEntrada(id_empleado);
    }
    updateAistenciaSalida(id_empleado) {
        return this.updateAistenciaSalida(id_empleado);
    }
    createProduccion(id_empleado, unidadesProducidas) {
        return this.createProduccion(id_empleado, unidadesProducidas);
    }
};
exports.EmpleadosController = EmpleadosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_empleado_dto_1.CreateEmpleado]),
    __metadata("design:returntype", void 0)
], EmpleadosController.prototype, "createEmpleado", null);
__decorate([
    (0, common_1.Post)("create-asistencia"),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_registro_asistencia_dto_1.CreateRegistroAsistencia]),
    __metadata("design:returntype", void 0)
], EmpleadosController.prototype, "asistencia", null);
__decorate([
    (0, common_1.Post)("create-produccion"),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_registro_produccion_dto_1.CreateRegistroProduccion]),
    __metadata("design:returntype", void 0)
], EmpleadosController.prototype, "produccion", null);
__decorate([
    (0, common_1.Get)("asistencia-empleado"),
    __param(0, (0, common_1.Query)('id_empleado')),
    __param(1, (0, common_1.Query)('fechaInicio')),
    __param(2, (0, common_1.Query)('fechaFin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", void 0)
], EmpleadosController.prototype, "getAsistencia", null);
__decorate([
    (0, common_1.Get)("nomina"),
    __param(0, (0, common_1.Query)('id_empleado')),
    __param(1, (0, common_1.Query)('fechaInicio')),
    __param(2, (0, common_1.Query)('fechaFin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", void 0)
], EmpleadosController.prototype, "getNomina", null);
__decorate([
    (0, common_1.Get)("dias-trabajados"),
    __param(0, (0, common_1.Query)('id_empleado')),
    __param(1, (0, common_1.Query)('fechaInicio')),
    __param(2, (0, common_1.Query)('fechaFin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", void 0)
], EmpleadosController.prototype, "getDiasTrabajados", null);
__decorate([
    (0, common_1.Get)("reporte-asistencia-empleado"),
    __param(0, (0, common_1.Query)('id_empleado')),
    __param(1, (0, common_1.Query)('fechaInicio')),
    __param(2, (0, common_1.Query)('fechaFin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", void 0)
], EmpleadosController.prototype, "getReporteAsistencia", null);
__decorate([
    (0, common_1.Get)("reporte-produccion"),
    __param(0, (0, common_1.Query)('id_empleado')),
    __param(1, (0, common_1.Query)('fechaInicio')),
    __param(2, (0, common_1.Query)('fechaFin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", void 0)
], EmpleadosController.prototype, "getReporteProduccion", null);
__decorate([
    (0, common_1.Get)("horas-trabajadas"),
    __param(0, (0, common_1.Query)('id_empleado')),
    __param(1, (0, common_1.Query)('fechaInicio')),
    __param(2, (0, common_1.Query)('fechaFin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", void 0)
], EmpleadosController.prototype, "getReporteHorasTrabajadas", null);
__decorate([
    (0, common_1.Get)("unidades-producidas"),
    __param(0, (0, common_1.Query)('id_empleado')),
    __param(1, (0, common_1.Query)('fechaInicio')),
    __param(2, (0, common_1.Query)('fechaFin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", void 0)
], EmpleadosController.prototype, "getProduccionTotal", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], EmpleadosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id_empleado'),
    __param(0, (0, common_1.Param)('id_empleado')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EmpleadosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id_empleado'),
    __param(0, (0, common_1.Param)('id_empleado')),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_empleado_dto_1.UpdateEmpleado]),
    __metadata("design:returntype", void 0)
], EmpleadosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id_empleado'),
    __param(0, (0, common_1.Param)('id_empleado')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EmpleadosController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)("entrada/:id_empleado"),
    __param(0, (0, common_1.Param)("id_empleado")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EmpleadosController.prototype, "createAistenciaEntrada", null);
__decorate([
    (0, common_1.Patch)("salida/:id_empleado"),
    __param(0, (0, common_1.Param)("id_empleado")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EmpleadosController.prototype, "updateAistenciaSalida", null);
__decorate([
    (0, common_1.Post)("produccion/:id_empleado/:unidadesProducidas"),
    __param(0, (0, common_1.Param)("id_empleado")),
    __param(1, (0, common_1.Param)("unidadesProducidas")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], EmpleadosController.prototype, "createProduccion", null);
exports.EmpleadosController = EmpleadosController = __decorate([
    (0, common_1.Controller)('empleados'),
    __metadata("design:paramtypes", [empleados_service_1.EmpleadosService])
], EmpleadosController);
//# sourceMappingURL=empleados.controller.js.map