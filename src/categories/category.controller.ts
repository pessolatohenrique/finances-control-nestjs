import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  CreateCategoryDto,
  ListCategoryDto,
  UpdateCategoryDto,
} from './category.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) { }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60 * 60000)
  @UseGuards(AuthGuard)
  getAll(): Promise<ListCategoryDto[]> {
    return this.service.getAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  async insert(@Body() dto: CreateCategoryDto) {
    await this.service.insert(dto);
    return { message: 'Created with success' };
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    await this.service.update(id, dto);
    return { message: 'Updated with success' };
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string) {
    await this.service.delete(id);
    return { message: 'Deleted with success' };
  }
}
