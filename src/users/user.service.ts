import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) { }

  async insert(dto: CreateUserDto): Promise<void> {
    await this.repository.insert(dto);
  }

  async findByEmailOrUsername(key: string) {
    return await this.repository.findOne({
      where: [{ email: key }, { username: key }],
    });
  }
}
