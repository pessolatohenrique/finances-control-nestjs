import { Injectable, NotFoundException } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { ExpenseEntity } from './expense.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseToUserEntity } from './expense-user.entity';
import { CreateExpenseUserListDto, UpdateExpenseUserDto } from './expense.dto';
import { SearchBudgetDTO } from 'src/budget/budget.dto';

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

  async updateFromUser(
    userId: string,
    id: string,
    dto: UpdateExpenseUserDto,
  ): Promise<void> {
    await this.findOneByIdAndUser(userId, id);

    await this.expenseUserRepository.update({ user: { id: userId }, id }, dto);
  }

  async deleteFromUser(userId: string, id: string): Promise<void> {
    await this.expenseUserRepository.softDelete({ user: { id: userId }, id });
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

  async getFromUserByTransactionDate(
    userId: string,
    dto: SearchBudgetDTO,
  ): Promise<ExpenseToUserEntity[]> {
    const { initialDate, finalDate } = dto;

    return this.expenseUserRepository.find({
      relations: {
        expense: true,
        category: true,
      },
      where: {
        user: { id: userId },
        transaction_date: Between(new Date(initialDate), new Date(finalDate)),
      },
    });
  }

  async sumFromUserByTransactionDate(
    userId: string,
    dto: SearchBudgetDTO,
  ): Promise<number> {
    const { initialDate, finalDate } = dto;

    const result = await this.expenseUserRepository
      .createQueryBuilder('expenseToUser')
      .select('SUM(expenseToUser.value)', 'total')
      .where('expenseToUser.userId = :userId', { userId })
      .andWhere(
        'expenseToUser.transaction_date BETWEEN :initialDate AND :finalDate',
        {
          initialDate: new Date(initialDate),
          finalDate: new Date(finalDate),
        },
      )
      .getRawOne();

    return result.total || 0;
  }
}
