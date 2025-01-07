import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { UserService } from 'src/users/user.service';
import * as bcyrp from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: UserService,
    private readonly jwtService: JwtService,
  ) { }

  @Post('/login')
  async login(@Body() dto: AuthDto) {
    const user = await this.service.findByEmailOrUsername(dto.username);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await bcyrp.compare(dto?.password, user?.password);

    if (!isPasswordValid || !user) {
      throw new BadRequestException('Invalid credentials');
    }

    const tokenPayload = {
      subId: user.id,
      username: user.username,
      email: user.email,
    };

    const tokenResult = await this.jwtService.signAsync(tokenPayload);

    return { access_token: tokenResult };
  }
}
