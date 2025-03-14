import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ExpenseEntity } from './expense.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseToUserEntity } from './expense-user.entity';
import { CreateExpenseUserListDto } from './expense.dto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(ExpenseEntity)
    private readonly expenseRepository: Repository<ExpenseEntity>,
    @InjectRepository(ExpenseToUserEntity)
    private readonly expenseUserRepository: Repository<ExpenseToUserEntity>,
  ) { }

  async getFromUser(userId: string): Promise<ExpenseToUserEntity[]> {
    return this.expenseUserRepository.find({
      relations: {
        category: true,
        expense: true,
      },
      where: { user: { id: userId } },
    });
  }

  async getOneFromUser(
    userId: string,
    id: string,
  ): Promise<ExpenseToUserEntity> {
    return this.findOneByIdAndUser(userId, id);
  }

  private async findOneByIdAndUser(
    userId: string,
    id: string,
  ): Promise<ExpenseToUserEntity> {
    const result = await this.expenseUserRepository.findOne({
      relations: {
        category: true,
        expense: true,
      },
      where: { user: { id: userId }, id },
    });

    if (!result) {
      throw new NotFoundException('Result not found');
    }

    return result;
  }

  async insertFromUser(
    userId: string,
    dto: CreateExpenseUserListDto,
  ): Promise<void> {
    const { expenses } = dto;

    for (const expense of expenses) {
      let existingExpense = await this.expenseRepository.findOne({
        where: { name: expense.name },
      });

      existingExpense = await this.expenseRepository.save({
        ...existingExpense,
        name: expense.name,
      });

      await this.expenseUserRepository.save({
        ...expense,
        userId,
        categoryId: expense.categoryId,
        expenseId: existingExpense.id,
        value: expense.value,
        transaction_date: expense.transaction_date,
      });
    }
  }
}
