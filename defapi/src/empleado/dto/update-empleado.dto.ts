import {
    IsString,
    MaxLength,
    MinLength,
    IsEmail,
    IsOptional,
} from 'class-validator';

export class UpdateEmpleadoDto {
    @IsOptional()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    nombre: string;

    @IsOptional()
    @IsString()
    @MaxLength(19)
    @MinLength(19)
    curp: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    rfc: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    nss: string;

    @IsOptional()
    @IsString()
    fecha_nacimiento: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    direccion: string;

    @IsOptional()
    @IsString()
    @MinLength(10)
    @MaxLength(10)
    telefono: string;

    @IsOptional()
    @IsEmail()
    correo: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    cargo: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    area: string;

    @IsOptional()
    @IsString()
    fecha_ingreso: string;

    @IsOptional()
    @IsString()
    @MinLength(4)
    @MaxLength(16)
    cuenta_bancaria: string;

    @IsOptional()
    @IsString()
    @MinLength(10)
    @MaxLength(10)
    contacto_exta: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    estado_civil: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    estudios: string;

    @IsOptional()
    @IsString()
    foto_perfil: string;

    @IsOptional()
    @IsString()
    ine_anversa: string;

    @IsOptional()
    @IsString()
    ine_reverso: string;

    @IsOptional()
    @IsString()
    comprobante_domicilio: string;

    @IsOptional()
    @IsString()
    constancia_fiscal: string;

    @IsOptional()
    @IsString()
    acta_nacimiento: string;
}
