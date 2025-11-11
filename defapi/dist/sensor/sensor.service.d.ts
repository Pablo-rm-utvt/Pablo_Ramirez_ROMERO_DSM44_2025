import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { Sensor } from './schemas/sensor.schema';
import { Model } from 'mongoose';
export declare class SensorService {
    private sensorModel;
    constructor(sensorModel: Model<Sensor>);
    paginate(page: number | undefined, limit: number | undefined, baseUrl: string): Promise<{
        total: number;
        totalPages: number;
        links: {
            prev: string | null;
            next: string | null;
        };
        data: (import("mongoose").Document<unknown, {}, Sensor, {}, {}> & Sensor & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    create(data: CreateSensorDto): Promise<import("mongoose").Document<unknown, {}, Sensor, {}, {}> & Sensor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Sensor, {}, {}> & Sensor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id_sensor: string): Promise<(import("mongoose").Document<unknown, {}, Sensor, {}, {}> & Sensor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    update(id_sensor: string, data: UpdateSensorDto): Promise<(import("mongoose").Document<unknown, {}, Sensor, {}, {}> & Sensor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    remove(id_sensor: string): Promise<(import("mongoose").Document<unknown, {}, Sensor, {}, {}> & Sensor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    findDataOfDays(data: Date): Promise<(import("mongoose").Document<unknown, {}, Sensor, {}, {}> & Sensor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findDays(find: string): Promise<(import("mongoose").Document<unknown, {}, Sensor, {}, {}> & Sensor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[] | undefined>;
    data(): Promise<{
        numberRegisters: number;
        today: {
            maxToday: number;
            minToday: number;
            lastToday: (import("mongoose").Document<unknown, {}, Sensor, {}, {}> & Sensor & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            })[];
        };
        yesterday: {
            maxYesterday: number;
            minYesterday: number;
            lastYesterday: (import("mongoose").Document<unknown, {}, Sensor, {}, {}> & Sensor & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            })[];
        };
        beforeYesterday: {
            maxBeforeYesterday: number;
            minBeforeYesterday: number;
            lastBeforeYesterday: (import("mongoose").Document<unknown, {}, Sensor, {}, {}> & Sensor & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            })[];
        };
    }>;
}
