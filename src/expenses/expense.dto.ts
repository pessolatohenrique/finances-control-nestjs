import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateExpenseDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}

export class CreateExpenseUserDto extends CreateExpenseDto {
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsDateString()
  @IsNotEmpty()
  transaction_date: string;
}

export class CreateExpenseUserListDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExpenseUserDto)
  @IsNotEmpty({ each: true })
  expenses: CreateExpenseUserDto[];
}
