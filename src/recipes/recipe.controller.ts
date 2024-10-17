import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import {
  CreateRecipeCategoryDto,
  CreateRecipeDto,
  ListRecipeDto,
  UpdateRecipeDto,
} from './recipe.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly service: RecipeService) { }

  @Get()
  getAll(): Promise<ListRecipeDto[]> {
    return this.service.getAll();
  }

  @Post()
  async insert(@Body() dto: CreateRecipeDto) {
    await this.service.insert(dto);
    return { message: 'Created with success' };
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateRecipeDto) {
    await this.service.update(id, dto);
    return { message: 'Updated with success' };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.service.delete(id);
    return { message: 'Deleted with success' };
  }

  @Post('/categories/associate')
  async associateCategory(@Body() dto: CreateRecipeCategoryDto) {
    await this.service.associateCategory(dto);
    return { message: 'Categories associated with success' };
  }
}
