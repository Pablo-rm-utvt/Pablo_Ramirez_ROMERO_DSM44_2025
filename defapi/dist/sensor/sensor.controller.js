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
exports.SensorController = void 0;
const common_1 = require("@nestjs/common");
const sensor_service_1 = require("./sensor.service");
const create_sensor_dto_1 = require("./dto/create-sensor.dto");
const update_sensor_dto_1 = require("./dto/update-sensor.dto");
const express = __importStar(require("express"));
let SensorController = class SensorController {
    sensorService;
    constructor(sensorService) {
        this.sensorService = sensorService;
    }
    create(data) {
        return this.sensorService.create(data);
    }
    data() {
        return this.sensorService.data();
    }
    paginate(page = 1, limit = 100, req) {
        const baseUrl = `${req.protocol}://${req.host}${req.baseUrl}/api/dsm44/sensor/paginate`;
        return this.sensorService.paginate(page, limit, baseUrl);
    }
    findAll() {
        return this.sensorService.findAll();
    }
    findOne(id_sensor) {
        return this.sensorService.findOne(id_sensor);
    }
    update(id_sensor, data) {
        return this.sensorService.update(id_sensor, data);
    }
    remove(id_sensor) {
        return this.sensorService.remove(id_sensor);
    }
};
exports.SensorController = SensorController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sensor_dto_1.CreateSensorDto]),
    __metadata("design:returntype", void 0)
], SensorController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("data"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SensorController.prototype, "data", null);
__decorate([
    (0, common_1.Get)("paginate"),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", void 0)
], SensorController.prototype, "paginate", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SensorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id_sensor"),
    __param(0, (0, common_1.Param)('id_sensor')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SensorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id_sensor'),
    __param(0, (0, common_1.Param)('id_sensor')),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_sensor_dto_1.UpdateSensorDto]),
    __metadata("design:returntype", void 0)
], SensorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id_sensor'),
    __param(0, (0, common_1.Param)('id_sensor')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SensorController.prototype, "remove", null);
exports.SensorController = SensorController = __decorate([
    (0, common_1.Controller)('sensor'),
    __metadata("design:paramtypes", [sensor_service_1.SensorService])
], SensorController);
//# sourceMappingURL=sensor.controller.js.map