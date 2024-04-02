import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EarningRepository } from './earning.repository';
import { CreateEarningDto, UpdateEarningDto } from './earning.dto';
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

  @Put('/:id')
  update(@Param('id') id: string, @Body() dto: UpdateEarningDto) {
    return this.repository.update(id, dto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.repository.delete(id);
  }
}
