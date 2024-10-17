import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeEntity } from './recipe.entity';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { CategoryEntity } from 'src/categories/category.entity';
import { RecipeCategoryEntity } from './recipe-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RecipeEntity,
      CategoryEntity,
      RecipeCategoryEntity,
    ]),
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipesModule { }
