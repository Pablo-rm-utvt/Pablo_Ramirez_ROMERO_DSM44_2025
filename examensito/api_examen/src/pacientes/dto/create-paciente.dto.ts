import { IsString, IsDateString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreatePacienteDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    apellido: string;

    @IsDateString()
    @IsNotEmpty()
    fecha_nacimiento: string;

    @IsString()
    @IsNotEmpty()
    sexo: string;

    @IsString()
    @IsNotEmpty()
    telefono: string;

    @IsString()
    @IsNotEmpty()
    direccion: string;

    @IsString()
    @IsNotEmpty()
    tipo_sangre: string;

    @IsString()
    @IsOptional()
    alergias: string;

    @IsBoolean()
    @IsOptional()
    activo: boolean = true;
}
