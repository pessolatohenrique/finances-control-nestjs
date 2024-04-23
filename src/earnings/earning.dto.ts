import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { IsEarningAlreadyRegistered } from './earning.validator';

export class CreateEarningDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsEarningAlreadyRegistered({ message: 'The name already exists' })
  name: string;
}

export class UpdateEarningDto {
  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}

export class ListEarningDto {
  name: string;
}
