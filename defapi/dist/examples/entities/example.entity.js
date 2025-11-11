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
exports.Example = void 0;
const typeorm_1 = require("typeorm");
let Example = class Example {
    id_example;
    correo_example;
    nota_example;
    ciudad_example;
    proveedor_example;
    prioridad_example;
    image1_example;
    image2_example;
    image3_example;
    update;
};
exports.Example = Example;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Example.prototype, "id_example", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Example.prototype, "correo_example", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Example.prototype, "nota_example", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Example.prototype, "ciudad_example", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Example.prototype, "proveedor_example", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Example.prototype, "prioridad_example", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Example.prototype, "image1_example", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Example.prototype, "image2_example", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Example.prototype, "image3_example", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Example.prototype, "update", void 0);
exports.Example = Example = __decorate([
    (0, typeorm_1.Entity)()
], Example);
//# sourceMappingURL=example.entity.js.map