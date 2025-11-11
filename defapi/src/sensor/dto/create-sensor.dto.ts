import { IsNotEmpty, IsEnum, IsNumber, IsDateString, IsOptional } from "class-validator";
import { EstadoSensor } from "../schemas/sensor.schema";

export class CreateSensorDto {
    @IsNotEmpty()
    @IsDateString()
    fecha: Date;

    @IsNotEmpty()
    @IsNumber()
    distacia_cm: number;

    @IsNotEmpty()
    @IsNumber()
    distacia_inch: number;

    @IsNotEmpty()
    @IsNumber()
    temperatura_fg: number;

    @IsNotEmpty()
    @IsNumber()
    temperatura_c: number;

    @IsOptional()
    @IsEnum(EstadoSensor)
    estado: EstadoSensor;
}