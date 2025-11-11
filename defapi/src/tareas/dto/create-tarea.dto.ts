import { IsString, IsNumber, MinLength, MaxLength } from "class-validator";

export class CreateTarea {
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    nombre: string;

    @IsString()
    @MinLength(5)
    @MaxLength(255)
    materia: string;

    @IsString()
    @MinLength(5)
    @MaxLength(255)
    fecha: string;

    @IsNumber()
    prioridad: number;
}