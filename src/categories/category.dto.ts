import { IsNotEmpty, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCategoryDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) { }

export class ListCategoryDto {
  name: string;
}
