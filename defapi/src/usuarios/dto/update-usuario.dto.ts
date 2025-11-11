import {
    IsString,
    MaxLength,
    MinLength,
    IsDateString,
    IsEmail,
    IsOptional
} from "class-validator";

export class UpdateUsuarioDto {

    @IsString()
    @MaxLength(255)
    @MinLength(4)
    @IsOptional()
    username: string;

    @IsEmail()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    @IsOptional()
    email: string;

    @IsString()
    @MaxLength(255)
    @MinLength(4)
    @IsOptional()
    password: string;

    @IsString()
    @IsOptional()
    image: string;

    @IsDateString()
    @IsOptional()
    update: Date;
}