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
import {
  CreateEarningDto,
  ListEarningDto,
  UpdateEarningDto,
} from './earning.dto';
import { EarningService } from './earning.service';

@Controller('earning')
export class EarningController {
  constructor(
    private readonly repository: EarningRepository,
    private readonly service: EarningService,
  ) { }

  @Get()
  getAll(): Promise<ListEarningDto[]> {
    return this.service.getAll();
  }

  @Post()
  async insert(@Body() dto: CreateEarningDto) {
    await this.service.insert(dto);
    return { message: 'Created with success' };
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateEarningDto) {
    await this.service.update(id, dto);
    return { message: 'Updated with success' };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.service.delete(id);
    return { message: 'Deleted with success' };
  }
}
