import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeEntity } from './recipe.entity';
import {
  CreateRecipeCategoryDto,
  CreateRecipeDto,
  UpdateRecipeDto,
} from './recipe.dto';
import { RecipeCategoryEntity } from './recipe-category.entity';
import { CategoryEntity } from 'src/categories/category.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly repository: Repository<RecipeEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(RecipeCategoryEntity)
    private readonly recipeCategoryRepository: Repository<RecipeCategoryEntity>,
  ) { }

  async getAll(): Promise<RecipeEntity[]> {
    return this.repository.find({
      relations: {
        recipeToCategories: true,
      },
    });
  }

  async insert(dto: CreateRecipeDto): Promise<void> {
    this.repository.insert(dto);
  }

  async update(id: string, dto: UpdateRecipeDto): Promise<void> {
    this.repository.update({ id }, dto);
  }

  async delete(id: string): Promise<void> {
    this.repository.delete(id);
  }

  async associateCategory(dto: CreateRecipeCategoryDto): Promise<void> {
    const { recipeId, categories } = dto;

    for (const category of categories) {
      let existingCategory = await this.categoryRepository.findOne({
        where: { name: category.name },
      });

      existingCategory = await this.categoryRepository.save({
        ...existingCategory,
        name: category.name,
      });

      const existingRecipeCategory =
        await this.recipeCategoryRepository.findOne({
          where: { recipeId, categoryId: existingCategory.id },
        });

      await this.recipeCategoryRepository.save({
        ...existingRecipeCategory,
        recipeId,
        categoryId: existingCategory.id,
        percentage: category.percentage,
      });
    }
  }
}
