import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

export class CreateEarningDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}

export class CreateEarningUserDto extends CreateEarningDto {
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsDateString()
  @IsNotEmpty()
  transaction_date: string;
}

export class UpdateEarningUserDto extends OmitType(CreateEarningUserDto, [
  'name',
] as const) { }

export class CreateEarningUserListDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEarningUserDto)
  @IsNotEmpty({ each: true })
  earnings: CreateEarningUserDto[];
}

export class UpdateEarningDto extends PartialType(CreateEarningDto) { }

export class ListEarningDto {
  name: string;
}
