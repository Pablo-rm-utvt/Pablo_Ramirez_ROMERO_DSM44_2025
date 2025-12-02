import { 
    IsString,
    MaxLength,
    MinLength,
    IsOptional,
    IsEnum,
    IsBoolean,
    IsPositive,
    IsNumber
} from "class-validator";
import { Type } from "class-transformer";
import { RegistroAsistencia } from "../entities/registro-asistencia.entity";
import { RegistroProduccion } from "../entities/registro-produccion.entity";
import { Area } from "../enum/area.enum";
import { Turno } from "../enum/turno.enum";

export class CreateEmpleado {
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    nombre:         string;

    @IsString()
    @MinLength(3)
    @MaxLength(255)
    apellido_p:     string;

    @IsString()
    @MinLength(3)
    @MaxLength(255)
    apellido_m:     string;
   
    @IsEnum( Area )
    @IsOptional()
    area:           Area;

    @IsEnum( Turno )
    @IsOptional()
    turno:          Turno;

    @IsNumber()
    @IsPositive()
    salarioDiario:  number;

    @IsBoolean()
    @IsOptional()
    activo:         boolean;

    @Type( () => RegistroProduccion )
    @IsOptional()
    produccion?:     RegistroProduccion[];

    @Type( () => RegistroAsistencia )
    @IsOptional()
    asistencia?:     RegistroAsistencia[];
}
