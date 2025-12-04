import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Turno } from '../enum/turno.enum';

export class CreateRegistroProduccion {
    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    id_empleado?:        number;

    @IsNotEmpty()
    @IsDateString()
    fecha:              string;

    @IsOptional()
    @IsEnum(Turno)
    turno:              Turno;

    @IsOptional()
    @IsInt()
    @IsPositive()
    unidadesProducidas: number;
}
