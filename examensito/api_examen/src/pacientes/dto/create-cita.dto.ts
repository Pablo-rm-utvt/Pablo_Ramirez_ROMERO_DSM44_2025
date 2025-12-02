import { IsNumber, IsDateString, IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';
import { EstatusCita } from '../enum/estatus-cita.enum';

export class CreateCitaDto {
    @IsNumber()
    @IsNotEmpty()
    id_paciente: number;

    @IsDateString()
    @IsNotEmpty()
    fecha: string;

    @IsString()
    @IsNotEmpty()
    hora: string;

    @IsString()
    @IsNotEmpty()
    motivo: string;

    @IsString()
    @IsNotEmpty()
    medico_asignado: string;

    @IsEnum(EstatusCita)
    @IsOptional()
    estatus: EstatusCita = EstatusCita.PROGRAMADA;
}
