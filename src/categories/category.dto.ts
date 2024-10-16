import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}

export class UpdateCategoryDto {
  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}

export class ListCategoryDto {
  name: string;
}
