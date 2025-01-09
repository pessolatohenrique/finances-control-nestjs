import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EarningRepository } from './earning.repository';
import {
  CreateEarningDto,
  ListEarningDto,
  UpdateEarningDto,
} from './earning.dto';
import { EarningService } from './earning.service';
import { AuthGuard, UserPayload } from 'src/auth/auth.guard';

@Controller('earning')
export class EarningController {
  constructor(private readonly service: EarningService) { }

  @Get()
  @UseGuards(AuthGuard)
  getAll(): Promise<ListEarningDto[]> {
    return this.service.getAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  async insert(@Body() dto: CreateEarningDto) {
    await this.service.insert(dto);
    return { message: 'Created with success' };
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateEarningDto) {
    await this.service.update(id, dto);
    return { message: 'Updated with success' };
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string) {
    await this.service.delete(id);
    return { message: 'Deleted with success' };
  }

  @Get('/user')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getFromUser(@Req() req: { user: UserPayload }) {
    return this.service.getFromUser(req.user.subId);
  }
}
