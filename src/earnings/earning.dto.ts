import { IsNotEmpty } from 'class-validator';

export class CreateEarningDto {
  @IsNotEmpty()
  name: string;
}
