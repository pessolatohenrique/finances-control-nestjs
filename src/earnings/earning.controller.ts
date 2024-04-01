import { Body, Controller, Get, Post } from '@nestjs/common';
import { EarningRepository } from './earning.repository';
import { CreateEarningDto } from './earning.dto';
import { EarningEntity } from './earning.entity';
import { v4 as uuidv4 } from 'uuid';

@Controller('earning')
export class EarningController {
  constructor(private readonly repository: EarningRepository) { }
  @Get()
  getAll(): CreateEarningDto[] {
    return this.repository.getAll();
  }

  @Post()
  insert(@Body() dto: CreateEarningDto): EarningEntity {
    const entity: EarningEntity = { ...dto, id: uuidv4() };
    this.repository.insert(entity);
    return entity;
  }
}
