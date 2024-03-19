import { Body, Controller, Get, Post } from '@nestjs/common';
import { EarningRepository } from './earning.repository';
import { EarningDto } from './earning.dto';

@Controller('earning')
export class EarningController {
  constructor(private readonly repository: EarningRepository) { }
  @Get()
  getAll(): EarningDto[] {
    return this.repository.getAll();
  }

  @Post()
  insert(@Body() dto: EarningDto): EarningDto {
    this.repository.insert(dto);
    return dto;
  }
}
