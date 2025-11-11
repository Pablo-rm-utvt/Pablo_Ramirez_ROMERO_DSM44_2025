"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorModule = void 0;
const common_1 = require("@nestjs/common");
const sensor_service_1 = require("./sensor.service");
const sensor_controller_1 = require("./sensor.controller");
const sensor_schema_1 = require("./schemas/sensor.schema");
const mongoose_1 = require("@nestjs/mongoose");
let SensorModule = class SensorModule {
};
exports.SensorModule = SensorModule;
exports.SensorModule = SensorModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: sensor_schema_1.Sensor.name,
                    schema: sensor_schema_1.SensorSchema
                }
            ]),
        ],
        controllers: [sensor_controller_1.SensorController],
        providers: [sensor_service_1.SensorService],
    })
], SensorModule);
//# sourceMappingURL=sensor.module.js.map