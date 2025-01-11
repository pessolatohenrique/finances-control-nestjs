import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { UserPasswordPipe } from './user.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) { }

  @Post()
  @UsePipes(UserPasswordPipe)
  async insert(@Body() dto: CreateUserDto) {
    try {
      await this.service.insert(dto);
      return { message: 'Created with success' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
