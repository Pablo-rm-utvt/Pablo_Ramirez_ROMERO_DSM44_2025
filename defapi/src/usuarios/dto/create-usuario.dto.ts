import {
    IsString,
    MaxLength,
    MinLength,
    IsDateString,
    IsEmail,
    IsOptional
} from "class-validator";

export class CreateUsuarioDto {

    @IsString()
    @MaxLength(255)
    @MinLength(4)
    username: string;

    @IsEmail()
    @IsString()
    @MaxLength(255)
    @MinLength(4)
    email: string;

    @IsString()
    @MaxLength(255)
    @MinLength(4)
    password: string;

    @IsString()
    image: string;

    @IsDateString()
    @IsOptional()
    update: Date;
}