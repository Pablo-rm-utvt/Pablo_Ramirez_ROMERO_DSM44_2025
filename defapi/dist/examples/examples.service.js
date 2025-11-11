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
exports.ExamplesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const example_entity_1 = require("./entities/example.entity");
const bcrypt = __importStar(require("bcrypt"));
const typeorm_2 = require("typeorm");
let ExamplesService = class ExamplesService {
    ExampleRepository;
    constructor(ExampleRepository) {
        this.ExampleRepository = ExampleRepository;
    }
    async login(UpdateExampleDto) {
        try {
            const user = await this.ExampleRepository.findOneBy({ correo_example: UpdateExampleDto.correo_example });
            if (!user) {
                return false;
            }
            return (await bcrypt.compare(UpdateExampleDto.proveedor_example, user.proveedor_example)) ? user : false;
        }
        catch (error) {
            return false;
        }
    }
    async create(CreateExampleDto) {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(CreateExampleDto.proveedor_example, saltOrRounds);
        const register = { ...CreateExampleDto, password: hash };
        const new_user = this.ExampleRepository.create(register);
        return await this.ExampleRepository.save(new_user);
    }
    async update(id_example, UpdateExampleDto) {
        (UpdateExampleDto.proveedor_example) && (async () => {
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(UpdateExampleDto.proveedor_example, saltOrRounds);
            const register = { ...UpdateExampleDto, proveedor_example: hash };
            return await this.ExampleRepository.update(id_example, register);
        })();
        return await this.ExampleRepository.update(id_example, UpdateExampleDto);
    }
    async findAll() {
        return await this.ExampleRepository.find();
    }
    async findOne(id_example) {
        return await this.ExampleRepository.findBy({ id_example });
    }
    async remove(id_example) {
        return await this.ExampleRepository.delete(id_example);
    }
};
exports.ExamplesService = ExamplesService;
exports.ExamplesService = ExamplesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(example_entity_1.Example)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ExamplesService);
//# sourceMappingURL=examples.service.js.map