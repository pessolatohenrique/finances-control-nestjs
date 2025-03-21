import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseToUserEntity } from 'src/expenses/expense-user.entity';
import { ExpenseEntity } from 'src/expenses/expense.entity';
import { ExpenseService } from 'src/expenses/expense.service';
import { BudgetController } from './budget.controller';
import { EarningService } from 'src/earnings/earning.service';
import { EarningEntity } from 'src/earnings/earning.entity';
import { EarningToUserEntity } from 'src/earnings/earning-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExpenseEntity,
      ExpenseToUserEntity,
      EarningEntity,
      EarningToUserEntity,
    ]),
  ],
  controllers: [BudgetController],
  providers: [ExpenseService, EarningService],
})
export class BudgetModule { }
