import {
    IsString,
    MaxLength,
    MinLength,
    IsEmail,
} from "class-validator";

export class CreateEmpleadoDto {

    @IsString()
    @MaxLength(255)
    @MinLength(4)
    nombre: string;

    @IsString()
    @MaxLength(19)
    @MinLength(19)
    curp: string;

    @IsString()
    @MaxLength(255)
    @MinLength(4)
    rfc: string;

    @IsString()
    @MaxLength(255)
    @MinLength(4)
    nss: string;

    @IsString()
    fecha_nacimiento: string;

    @IsString()
    @MaxLength(255)
    @MinLength(4)
    direccion: string;

    @IsString()
    @MinLength(10)
    @MaxLength(10)
    telefono: string;

    @IsEmail()
    @IsString()
    correo: string;

    @IsString()
    @MaxLength(255)
    @MinLength(4)
    cargo: string;

    @IsString()
    @MaxLength(255)
    @MinLength(4)
    area: string;

    @IsString()
    fecha_ingreso: string;

    @IsString()
    @MinLength(4)
    @MaxLength(16)
    cuenta_bancaria: string;

    @IsString()
    @MinLength(10)
    @MaxLength(10)
    contacto_exta: string;

    @IsString()
    @MaxLength(255)
    @MinLength(4)
    estado_civil: string;

    @IsString()
    @MaxLength(255)
    @MinLength(4)
    estudios: string;

    @IsString()
    foto_perfil: string;

    @IsString()
    ine_anversa: string;

    @IsString()
    ine_reverso: string;

    @IsString()
    comprobante_domicilio: string;

    @IsString()
    constancia_fiscal: string;

    @IsString()
    acta_nacimiento: string;
}
