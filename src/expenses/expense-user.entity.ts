import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ExpenseEntity } from './expense.entity';
import { UserEntity } from 'src/users/user.entity';
import { CategoryEntity } from 'src/categories/category.entity';

@Entity('user_expense')
export class ExpenseToUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  expenseId: string;

  @Column()
  categoryId: string;

  @Column()
  @Exclude()
  userId: string;

  @Column('decimal')
  value: number;

  @Column()
  transaction_date: Date;

  @ManyToOne(() => ExpenseEntity, (expense) => expense.expenseToUsers)
  expense: ExpenseEntity;

  @ManyToOne(() => CategoryEntity, (expense) => expense.expenseToCategories)
  category: CategoryEntity;

  @ManyToOne(() => UserEntity, (user) => user.expenseToUsers)
  user: UserEntity;

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
