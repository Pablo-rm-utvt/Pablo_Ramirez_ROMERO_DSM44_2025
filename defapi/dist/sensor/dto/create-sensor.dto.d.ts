import { EstadoSensor } from "../schemas/sensor.schema";
export declare class CreateSensorDto {
    fecha: Date;
    distacia_cm: number;
    distacia_inch: number;
    temperatura_fg: number;
    temperatura_c: number;
    estado: EstadoSensor;
}
