import { IsString, IsDateString, IsNotEmpty, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class UpdatePacienteDto {
    @IsString()
    @IsOptional()
    nombre: string;

    @IsString()
    @IsOptional()
    apellido: string;

    @IsDateString()
    @IsOptional()
    fecha_nacimiento: string;

    @IsString()
    @IsOptional()
    sexo: string;

    @IsString()
    @IsOptional()
    telefono: string;

    @IsString()
    @IsOptional()
    direccion: string;

    @IsString()
    @IsOptional()
    tipo_sangre: string;

    @IsString()
    @IsOptional()
    alergias: string;

    @IsBoolean()
    @IsOptional()
    activo: boolean;
}
