import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export enum EstadoSensor {
    activo = "Activo",
    inactivo = "Inactivo",
}

@Schema()
export class Sensor {
    @Prop({ required: true })
    fecha: Date;

    @Prop()
    distacia_cm: number;

    @Prop()
    distacia_inch: number;

    @Prop()
    temperatura_fg: number;

    @Prop()
    temperatura_c: number;

    @Prop({ default: EstadoSensor.activo })
    estado: EstadoSensor;
}

export const SensorSchema = SchemaFactory.createForClass(Sensor);