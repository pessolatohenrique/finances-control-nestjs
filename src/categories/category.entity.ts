import { ExpenseToUserEntity } from 'src/expenses/expense-user.entity';
import { ExpenseEntity } from 'src/expenses/expense.entity';
import { RecipeCategoryEntity } from 'src/recipes/recipe-category.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(
    () => RecipeCategoryEntity,
    (recipeToCategory) => recipeToCategory.category,
  )
  recipeToCategories: RecipeCategoryEntity[];

  @OneToMany(() => ExpenseToUserEntity, (expense) => expense.category)
  expenseToCategories: ExpenseToUserEntity[];

  @CreateDateColumn({
    name: 'createdAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updatedAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deletedAt',
    type: 'timestamp',
  })
  deletedAt: Date;
}
