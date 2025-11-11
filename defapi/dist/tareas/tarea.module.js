"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TareaModule = void 0;
const common_1 = require("@nestjs/common");
const tarea_service_1 = require("./tarea.service");
const tarea_controller_1 = require("./tarea.controller");
const typeorm_1 = require("@nestjs/typeorm");
const tarea_entity_1 = require("./entities/tarea.entity");
let TareaModule = class TareaModule {
};
exports.TareaModule = TareaModule;
exports.TareaModule = TareaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                tarea_entity_1.Tarea
            ]),
        ],
        controllers: [tarea_controller_1.TareaController],
        providers: [tarea_service_1.TareaService]
    })
], TareaModule);
//# sourceMappingURL=tarea.module.js.map