import { Body, Controller, Get, Post } from '@nestjs/common';
import { EarningRepository } from './earning.repository';
import { CreateEarningDto } from './earning.dto';

@Controller('earning')
export class EarningController {
  constructor(private readonly repository: EarningRepository) { }
  @Get()
  getAll(): CreateEarningDto[] {
    return this.repository.getAll();
  }

  @Post()
  insert(@Body() dto: CreateEarningDto): CreateEarningDto {
    this.repository.insert(dto);
    return dto;
  }
}
