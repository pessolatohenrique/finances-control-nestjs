import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseEntity } from './expense.entity';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { ExpenseToUserEntity } from './expense-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseEntity, ExpenseToUserEntity])],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule { }
