import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  CreateCategoryDto,
  ListCategoryDto,
  UpdateCategoryDto,
} from './category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) { }

  @Get()
  getAll(): Promise<ListCategoryDto[]> {
    return this.service.getAll();
  }

  @Post()
  async insert(@Body() dto: CreateCategoryDto) {
    await this.service.insert(dto);
    return { message: 'Created with success' };
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    await this.service.update(id, dto);
    return { message: 'Updated with success' };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.service.delete(id);
    return { message: 'Deleted with success' };
  }
}
