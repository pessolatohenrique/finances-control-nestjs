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
import { RecipeService } from './recipe.service';
import {
  CreateRecipeCategoryDto,
  CreateRecipeDto,
  ListRecipeDto,
  UpdateRecipeDto,
} from './recipe.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly service: RecipeService) { }

  @Get()
  @UseGuards(AuthGuard)
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60 * 60000)
  getAll(): Promise<ListRecipeDto[]> {
    return this.service.getAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  async insert(@Body() dto: CreateRecipeDto) {
    await this.service.insert(dto);
    return { message: 'Created with success' };
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateRecipeDto) {
    await this.service.update(id, dto);
    return { message: 'Updated with success' };
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string) {
    await this.service.delete(id);
    return { message: 'Deleted with success' };
  }

  @Post('/categories/associate')
  @UseGuards(AuthGuard)
  async associateCategory(@Body() dto: CreateRecipeCategoryDto) {
    await this.service.associateCategory(dto);
    return { message: 'Categories associated with success' };
  }
}
