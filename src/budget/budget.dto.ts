import { IsNotEmpty, IsDateString } from 'class-validator';

export class SearchBudgetDTO {
  @IsNotEmpty()
  @IsDateString(
    { strict: true },
    { message: 'initialDate must be a valid date in the format YYYY-MM-DD' },
  )
  initialDate: string;

  @IsNotEmpty()
  @IsDateString(
    { strict: true },
    { message: 'finalDate must be a valid date in the format YYYY-MM-DD' },
  )
  finalDate: string;
}
