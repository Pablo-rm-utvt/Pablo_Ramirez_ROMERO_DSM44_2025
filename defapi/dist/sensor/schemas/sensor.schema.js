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
exports.SensorSchema = exports.Sensor = exports.EstadoSensor = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var EstadoSensor;
(function (EstadoSensor) {
    EstadoSensor["activo"] = "Activo";
    EstadoSensor["inactivo"] = "Inactivo";
})(EstadoSensor || (exports.EstadoSensor = EstadoSensor = {}));
let Sensor = class Sensor {
    fecha;
    distacia_cm;
    distacia_inch;
    temperatura_fg;
    temperatura_c;
    estado;
};
exports.Sensor = Sensor;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Sensor.prototype, "fecha", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Sensor.prototype, "distacia_cm", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Sensor.prototype, "distacia_inch", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Sensor.prototype, "temperatura_fg", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Sensor.prototype, "temperatura_c", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: EstadoSensor.activo }),
    __metadata("design:type", String)
], Sensor.prototype, "estado", void 0);
exports.Sensor = Sensor = __decorate([
    (0, mongoose_1.Schema)()
], Sensor);
exports.SensorSchema = mongoose_1.SchemaFactory.createForClass(Sensor);
//# sourceMappingURL=sensor.schema.js.map