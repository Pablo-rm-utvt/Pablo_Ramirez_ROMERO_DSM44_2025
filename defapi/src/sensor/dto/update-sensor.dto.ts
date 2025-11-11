import { IsNotEmpty, IsEnum, IsNumber, IsDateString, IsOptional } from "class-validator";
import { EstadoSensor } from "../schemas/sensor.schema";

export class UpdateSensorDto {
    @IsNotEmpty()
    @IsDateString()
    @IsOptional()
    fecha: Date;

    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    distacia_cm: number;

    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    distacia_inch: number;

    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    temperatura_fg: number;

    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    temperatura_c: number;

    @IsOptional()
    @IsEnum(EstadoSensor)
    estado: EstadoSensor;
}