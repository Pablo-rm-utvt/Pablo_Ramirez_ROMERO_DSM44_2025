export declare enum EstadoSensor {
    activo = "Activo",
    inactivo = "Inactivo"
}
export declare class Sensor {
    fecha: Date;
    distacia_cm: number;
    distacia_inch: number;
    temperatura_fg: number;
    temperatura_c: number;
    estado: EstadoSensor;
}
export declare const SensorSchema: import("mongoose").Schema<Sensor, import("mongoose").Model<Sensor, any, any, any, import("mongoose").Document<unknown, any, Sensor, any, {}> & Sensor & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Sensor, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Sensor>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Sensor> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
