import { IsNotEmpty, MinLength } from 'class-validator';
import { IsEarningAlreadyRegistered } from './earning.validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateEarningDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsEarningAlreadyRegistered({ message: 'The name already exists' })
  name: string;
}

export class UpdateEarningDto extends PartialType(CreateEarningDto) { }

export class ListEarningDto {
  name: string;
}
