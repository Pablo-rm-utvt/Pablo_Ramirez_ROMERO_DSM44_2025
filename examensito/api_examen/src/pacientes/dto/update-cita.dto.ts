import { IsDateString, IsOptional, IsString, IsEnum } from 'class-validator';
import { EstatusCita } from '../enum/estatus-cita.enum';

export class UpdateCitaDto {
    @IsDateString()
    @IsOptional()
    fecha: string;

    @IsString()
    @IsOptional()
    hora: string;

    @IsString()
    @IsOptional()
    motivo: string;

    @IsString()
    @IsOptional()
    medico_asignado: string;

    @IsEnum(EstatusCita)
    @IsOptional()
    estatus: EstatusCita;
}
