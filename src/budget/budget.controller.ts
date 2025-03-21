import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard, UserPayload } from 'src/auth/auth.guard';
import { SearchBudgetDTO } from './budget.dto';
import { EarningService } from 'src/earnings/earning.service';
import { ExpenseService } from 'src/expenses/expense.service';

@Controller('budget')
export class BudgetController {
  constructor(
    private readonly earningService: EarningService,
    private readonly expenseService: ExpenseService,
  ) { }

  @Get('/personal')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getPersonalBudget(
    @Req() req: { user: UserPayload },
    @Query() dto: SearchBudgetDTO,
  ) {
    const earnings = await this.earningService.getFromUserByTransactionDate(
      req.user.subId,
      dto,
    );

    const expenses = await this.expenseService.getFromUserByTransactionDate(
      req.user.subId,
      dto,
    );

    return { earnings, expenses };
  }
}
