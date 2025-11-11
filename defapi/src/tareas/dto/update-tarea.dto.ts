import { IsString, IsNumber, MinLength, MaxLength, IsOptional } from "class-validator";

export class UpdateTarea {
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    @IsOptional()
    nombre: string;

    @IsString()
    @MinLength(5)
    @MaxLength(255)
    @IsOptional()
    materia: string;

    @IsString()
    @MinLength(5)
    @MaxLength(255)
    @IsOptional()
    fecha: string;

    @IsNumber()
    @IsOptional()
    prioridad: number;
}