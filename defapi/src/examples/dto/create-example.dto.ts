import {
    IsString,
    MaxLength,
    MinLength,
    IsDateString,
    IsEmail,
    IsOptional,
    IsNumber
} from "class-validator";

export class CreateExampleDto {

    @IsEmail()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    correo_example: string;

    @IsString()
    @MaxLength(255)
    @MinLength(4)
    nota_example: string;

    @IsString()
    @MaxLength(255)
    @MinLength(4)
    ciudad_example: string;

    @IsString()
    @MaxLength(255)
    @MinLength(4)
    proveedor_example: string;

    @IsString()
    image1_example: string;

    @IsString()
    image2_example: string;

    @IsString()
    image3_example: string;

    @IsNumber()
    prioridad_example: number;

    @IsDateString()
    @IsOptional()
    update: Date;
}
