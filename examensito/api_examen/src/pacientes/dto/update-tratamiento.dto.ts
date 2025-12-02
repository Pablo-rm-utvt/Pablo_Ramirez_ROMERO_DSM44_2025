import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateTratamientoDto {
    @IsString()
    @IsOptional()
    diagnostico: string;

    @IsString()
    @IsOptional()
    medicamento: string;

    @IsString()
    @IsOptional()
    dosis: string;

    @IsDateString()
    @IsOptional()
    fecha_inicio: string;

    @IsDateString()
    @IsOptional()
    fecha_fin: string;

    @IsString()
    @IsOptional()
    notas: string;
}
