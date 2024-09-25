import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateRecipeDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}

export class UpdateRecipeDto {
  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}

export class ListRecipeDto {
  name: string;
}
