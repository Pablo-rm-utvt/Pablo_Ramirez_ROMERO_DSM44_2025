import { Injectable } from '@nestjs/common';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { Sensor } from './schemas/sensor.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SensorService {

    constructor(
        @InjectModel(Sensor.name) private sensorModel: Model<Sensor>
    ) { }

    async paginate(page: number = 1, limit = 100, baseUrl: string) {

        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            this.sensorModel
                .find()
                .sort({ fecha: - 1 })
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
        }
    }

    async create(data: CreateSensorDto) {
        const sensor_created = new this.sensorModel(data);
        return await sensor_created.save();
    }

    async findAll() {
        return await this.sensorModel.find().exec();
    }

    async findOne(id_sensor: string) {
        return await this.sensorModel.findById(id_sensor).exec();
    }

    async update(id_sensor: string, data: UpdateSensorDto) {
        return await this.sensorModel.findByIdAndUpdate(id_sensor, data, {
            new: true
        }).exec();
    }

    async remove(id_sensor: string) {
        return await this.sensorModel.findByIdAndDelete(id_sensor).exec();
    }

    async findDataOfDays(data: Date) {

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

    async findDays(find: string) {
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
        }
    }
}