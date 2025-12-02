import { IsNumber, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTratamientoDto {
    @IsNumber()
    @IsNotEmpty()
    id_paciente: number;

    @IsString()
    @IsNotEmpty()
    diagnostico: string;

    @IsString()
    @IsNotEmpty()
    medicamento: string;

    @IsString()
    @IsNotEmpty()
    dosis: string;

    @IsDateString()
    @IsNotEmpty()
    fecha_inicio: string;

    @IsDateString()
    @IsOptional()
    fecha_fin: string;

    @IsString()
    @IsOptional()
    notas: string;
}
