import { RecipeEntity } from 'src/recipes/recipe.entity';
import { CategoryEntity } from 'src/categories/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('recipe_category')
export class RecipeCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  recipeId: string;

  @Column()
  categoryId: string;

  @Column('decimal', { precision: 5, scale: 2 })
  percentage: number;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.recipeToCategories)
  recipe: RecipeEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.recipeToCategories)
  category: CategoryEntity;
}
