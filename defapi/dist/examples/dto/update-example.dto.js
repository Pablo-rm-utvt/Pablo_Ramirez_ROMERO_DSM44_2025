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
exports.UpdateExampleDto = void 0;
const class_validator_1 = require("class-validator");
class UpdateExampleDto {
    correo_example;
    nota_example;
    ciudad_example;
    proveedor_example;
    image1_example;
    image2_example;
    image3_example;
    prioridad_example;
    update;
}
exports.UpdateExampleDto = UpdateExampleDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateExampleDto.prototype, "correo_example", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateExampleDto.prototype, "nota_example", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateExampleDto.prototype, "ciudad_example", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateExampleDto.prototype, "proveedor_example", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateExampleDto.prototype, "image1_example", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateExampleDto.prototype, "image2_example", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateExampleDto.prototype, "image3_example", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateExampleDto.prototype, "prioridad_example", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateExampleDto.prototype, "update", void 0);
//# sourceMappingURL=update-example.dto.js.map