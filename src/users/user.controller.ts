import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { UserPasswordPipe } from './user.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) { }

  @Post()
  @UsePipes(UserPasswordPipe)
  async insert(@Body() dto: CreateUserDto) {
    await this.service.insert(dto);
    return { message: 'Created with success' };
  }
}
