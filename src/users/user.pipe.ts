import { Injectable, PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserPasswordPipe implements PipeTransform {
  constructor(private readonly configService: ConfigService) { }

  async transform(value: any) {
    const { password } = value;
    if (password) {
      const saltRounds = Number(this.configService.get<string>('HASH_SALT'));
      value.password = await bcrypt.hash(password, saltRounds);
    }
    return value;
  }
}
