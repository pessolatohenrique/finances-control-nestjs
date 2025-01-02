import {
  IsArray,
  IsInt,
  IsString,
  Min,
  ValidateNested,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreateRecipeDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) { }

export class ListRecipeDto {
  name: string;
}

export class CategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  percentage: number;
}

export class CreateRecipeCategoryDto {
  @IsNotEmpty()
  @IsString()
  recipeId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryDto)
  @IsNotEmpty({ each: true })
  categories: CategoryDto[];
}
