import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard, UserPayload } from 'src/auth/auth.guard';
import { ExpenseService } from './expense.service';
import { Body, Post } from '@nestjs/common';
import { CreateExpenseUserListDto, UpdateExpenseUserDto } from './expense.dto';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly service: ExpenseService) { }

  @Get('/personal')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getFromUser(@Req() req: { user: UserPayload }) {
    return this.service.getFromUser(req.user.subId);
  }

  @Get('/personal/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getOneFromUser(
    @Req() req: { user: UserPayload },
    @Param('id') id: string,
  ) {
    return this.service.getOneFromUser(req.user.subId, id);
  }

  @Post('/personal')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async insertFromUser(
    @Req() req: { user: UserPayload },
    @Body() dto: CreateExpenseUserListDto,
  ) {
    await this.service.insertFromUser(req.user.subId, dto);
    return { message: 'Created with success' };
  }

  @Put('/personal/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async updateFromUser(
    @Req() req: { user: UserPayload },
    @Param('id') id: string,
    @Body() dto: UpdateExpenseUserDto,
  ) {
    await this.service.updateFromUser(req.user.subId, id, dto);
    return { message: 'Updated with success' };
  }

  @Delete('/personal/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async deleteFromUser(
    @Req() req: { user: UserPayload },
    @Param('id') id: string,
  ) {
    await this.service.deleteFromUser(req.user.subId, id);
    return { message: 'Deleted with success' };
  }
}
