import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Turno } from '../enum/turno.enum';
import { StatusTurno } from '../enum/status-turno.enum';

export class CreateRegistroAsistencia {
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  id_empleado?:      number;

  @IsNotEmpty()
  @IsDateString()
  fecha:            string;

  @IsNotEmpty()
  @IsDateString()
  horaEntrada:      string;

  @IsNotEmpty()
  @IsDateString()
  horaSalida:       string;

  @IsOptional()
  @IsBoolean()
  puntual:          boolean;

  @IsOptional()
  @IsNumber()
  horasTrabajadas:  number;

  @IsOptional()
  @IsEnum(Turno)
  turno:            Turno;

  @IsOptional()
  @IsEnum(StatusTurno)
  estatus:          StatusTurno;
}
