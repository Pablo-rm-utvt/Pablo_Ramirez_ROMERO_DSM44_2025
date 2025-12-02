import { 
    IsString,
    MaxLength,
    MinLength,
    IsOptional,
    IsEnum,
    IsBoolean,
    IsNumber,
    IsPositive
} from "class-validator";
import { Type } from "class-transformer";
import { RegistroAsistencia } from "../entities/registro-asistencia.entity";
import { RegistroProduccion } from "../entities/registro-produccion.entity";
import { Area } from "../enum/area.enum";
import { Turno } from "../enum/turno.enum";

export class UpdateEmpleado {
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    @IsOptional()
    nombre:         string;

    @IsString()
    @MinLength(3)
    @MaxLength(255)
    @IsOptional()
    apellido_p:     string;

    @IsString()
    @MinLength(3)
    @MaxLength(255)
    @IsOptional()
    apellido_m:     string;
   
    @IsEnum( Area )
    @IsOptional()
    area:           Area;

    @IsEnum( Turno )
    @IsOptional()
    turno:          Turno;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    salarioDiario:  number;

    @IsBoolean()
    @IsOptional()
    activo:         boolean;

    @Type( () => RegistroProduccion )
    @IsOptional()
    produccion?: RegistroProduccion[];

    @Type( () => RegistroAsistencia )
    @IsOptional()
    asistencia?: RegistroAsistencia[];
}
