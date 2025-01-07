import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from 'src/users/user.service';
import { UserEntity } from 'src/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [UserService],
})
export class AuthModule { }
