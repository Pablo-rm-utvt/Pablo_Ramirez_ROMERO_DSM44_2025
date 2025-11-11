import {
    IsString,
    MaxLength,
    MinLength,
    IsDateString,
    IsEmail,
    IsOptional,
    IsNumber
} from "class-validator";

export class UpdateExampleDto {

    @IsEmail()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    @IsOptional()
    correo_example: string;

    @IsString()
    @MaxLength(255)
    @MinLength(4)
    @IsOptional()
    nota_example: string;

    @IsString()
    @MaxLength(255)
    @MinLength(4)
    @IsOptional()
    ciudad_example: string;

    @IsString()
    @MaxLength(255)
    @MinLength(4)
    @IsOptional()
    proveedor_example: string;


    @IsString()
    image1_example: string;

    @IsString()
    @IsOptional()
    image2_example: string;

    @IsString()
    @IsOptional()
    image3_example: string;

    @IsOptional()
    @IsNumber()
    prioridad_example: number;

    @IsDateString()
    @IsOptional()
    update: Date;
}