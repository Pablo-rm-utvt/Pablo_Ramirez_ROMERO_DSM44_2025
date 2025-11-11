import { SensorService } from './sensor.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import * as express from 'express';
export declare class SensorController {
    private readonly sensorService;
    constructor(sensorService: SensorService);
    create(data: CreateSensorDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/sensor.schema").Sensor, {}, {}> & import("./schemas/sensor.schema").Sensor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    data(): Promise<{
        numberRegisters: number;
        today: {
            maxToday: number;
            minToday: number;
            lastToday: (import("mongoose").Document<unknown, {}, import("./schemas/sensor.schema").Sensor, {}, {}> & import("./schemas/sensor.schema").Sensor & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            })[];
        };
        yesterday: {
            maxYesterday: number;
            minYesterday: number;
            lastYesterday: (import("mongoose").Document<unknown, {}, import("./schemas/sensor.schema").Sensor, {}, {}> & import("./schemas/sensor.schema").Sensor & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            })[];
        };
        beforeYesterday: {
            maxBeforeYesterday: number;
            minBeforeYesterday: number;
            lastBeforeYesterday: (import("mongoose").Document<unknown, {}, import("./schemas/sensor.schema").Sensor, {}, {}> & import("./schemas/sensor.schema").Sensor & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            })[];
        };
    }>;
    paginate(page: number | undefined, limit: number | undefined, req: express.Request): Promise<{
        total: number;
        totalPages: number;
        links: {
            prev: string | null;
            next: string | null;
        };
        data: (import("mongoose").Document<unknown, {}, import("./schemas/sensor.schema").Sensor, {}, {}> & import("./schemas/sensor.schema").Sensor & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/sensor.schema").Sensor, {}, {}> & import("./schemas/sensor.schema").Sensor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id_sensor: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/sensor.schema").Sensor, {}, {}> & import("./schemas/sensor.schema").Sensor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    update(id_sensor: string, data: UpdateSensorDto): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/sensor.schema").Sensor, {}, {}> & import("./schemas/sensor.schema").Sensor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    remove(id_sensor: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/sensor.schema").Sensor, {}, {}> & import("./schemas/sensor.schema").Sensor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
}
