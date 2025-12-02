"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const examples_module_1 = require("./examples/examples.module");
const example_entity_1 = require("./examples/entities/example.entity");
const empleados_module_1 = require("./empleados/empleados.module");
const clinica_module_1 = require("./clinica/clinica.module");
const clinica_entity_1 = require("./clinica/entities/clinica.entity");
const sensor_module_1 = require("./sensor/sensor.module");
const mongoose_1 = require("@nestjs/mongoose");
const empleado_entity_1 = require("./empleados/entities/empleado.entity");
const registro_asistencia_entity_1 = require("./empleados/entities/registro-asistencia.entity");
const registro_produccion_entity_1 = require("./empleados/entities/registro-produccion.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot("mongodb://localhost:27017/DSM44"),
            typeorm_1.TypeOrmModule.forRoot({
                name: "conexion-postgres-form",
                type: "postgres",
                host: "localhost",
                port: 5432,
                username: "postgres",
                password: "1234",
                database: "formularios",
                entities: [example_entity_1.Example],
                synchronize: true,
                autoLoadEntities: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                name: "conexion-postgres",
                type: "postgres",
                host: "localhost",
                port: 5432,
                username: "postgres",
                password: "1234",
                database: "dsm44",
                entities: [empleado_entity_1.Empleado, registro_asistencia_entity_1.RegistroAsistencia, registro_produccion_entity_1.RegistroProduccion],
                synchronize: true,
                autoLoadEntities: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                name: "conexion-postgres-form",
                type: "postgres",
                host: "localhost",
                port: 5432,
                username: "postgres",
                password: "1234",
                database: "formularios",
                entities: [clinica_entity_1.Clinica],
                synchronize: true,
                autoLoadEntities: true,
            }),
            empleados_module_1.EmpleadosModule,
            examples_module_1.ExamplesModule,
            clinica_module_1.ClinicaModule,
            sensor_module_1.SensorModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map