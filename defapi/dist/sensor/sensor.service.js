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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorService = void 0;
const common_1 = require("@nestjs/common");
const sensor_schema_1 = require("./schemas/sensor.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let SensorService = class SensorService {
    sensorModel;
    constructor(sensorModel) {
        this.sensorModel = sensorModel;
    }
    async paginate(page = 1, limit = 100, baseUrl) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.sensorModel
                .find()
                .sort({ fecha: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.sensorModel.countDocuments().exec(),
        ]);
        const totalPages = Math.ceil(total / limit);
        const next = (page < totalPages)
            ? `${baseUrl}?page=${Number(page) + 1}&limit=${limit}`
            : null;
        const prev = (page > 1)
            ? `${baseUrl}?page=${Number(page) - 1}&limit=${limit}`
            : null;
        return {
            total,
            totalPages,
            links: {
                prev,
                next
            },
            data
        };
    }
    async create(data) {
        const sensor_created = new this.sensorModel(data);
        return await sensor_created.save();
    }
    async findAll() {
        return await this.sensorModel.find().exec();
    }
    async findOne(id_sensor) {
        return await this.sensorModel.findById(id_sensor).exec();
    }
    async update(id_sensor, data) {
        return await this.sensorModel.findByIdAndUpdate(id_sensor, data, {
            new: true
        }).exec();
    }
    async remove(id_sensor) {
        return await this.sensorModel.findByIdAndDelete(id_sensor).exec();
    }
    async findDataOfDays(data) {
        const startOfDay = new Date(data);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(data);
        endOfDay.setHours(23, 59, 59, 999);
        const records = await this.sensorModel.find({
            fecha: {
                $gte: startOfDay,
                $lte: endOfDay,
            }
        })
            .sort({
            fecha: -1
        }).limit(10);
        return records;
    }
    async findDays(find) {
        switch (find) {
            case "today":
                const today = new Date();
                return await this.findDataOfDays(today);
            case "yesterday":
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                return await this.findDataOfDays(yesterday);
            case "beforeYesterday":
                const beforeYesterday = new Date();
                beforeYesterday.setDate(beforeYesterday.getDate() - 2);
                return await this.findDataOfDays(beforeYesterday);
        }
    }
    async data() {
        const numberRegisters = await this.sensorModel.countDocuments().exec();
        const lastToday = await this.findDays("today") || [];
        const maxToday = (lastToday.length != 0) ? lastToday.reduce((max, obj) => obj.temperatura_c > max ? obj.temperatura_c : max, lastToday[0].temperatura_c) : 0;
        const minToday = (lastToday.length != 0) ? lastToday.reduce((min, obj) => obj.temperatura_c < min ? obj.temperatura_c : min, lastToday[0].temperatura_c) : 0;
        const lastYesterday = await this.findDays("yesterday") || [];
        const maxYesterday = (lastYesterday.length != 0) ? lastYesterday.reduce((max, obj) => obj.temperatura_c > max ? obj.temperatura_c : max, lastToday[0].temperatura_c) : 0;
        const minYesterday = (lastYesterday.length != 0) ? lastYesterday.reduce((min, obj) => obj.temperatura_c < min ? obj.temperatura_c : min, lastToday[0].temperatura_c) : 0;
        const lastBeforeYesterday = await this.findDays("beforeYesterday") || [];
        const maxBeforeYesterday = (lastBeforeYesterday.length != 0) ? lastBeforeYesterday.reduce((max, obj) => obj.temperatura_c > max ? obj.temperatura_c : max, lastToday[0].temperatura_c) : 0;
        const minBeforeYesterday = (lastBeforeYesterday.length != 0) ? lastBeforeYesterday.reduce((min, obj) => obj.temperatura_c < min ? obj.temperatura_c : min, lastToday[0].temperatura_c) : 0;
        return {
            numberRegisters,
            today: {
                maxToday,
                minToday,
                lastToday,
            },
            yesterday: {
                maxYesterday,
                minYesterday,
                lastYesterday,
            },
            beforeYesterday: {
                maxBeforeYesterday,
                minBeforeYesterday,
                lastBeforeYesterday,
            }
        };
    }
};
exports.SensorService = SensorService;
exports.SensorService = SensorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(sensor_schema_1.Sensor.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SensorService);
//# sourceMappingURL=sensor.service.js.map