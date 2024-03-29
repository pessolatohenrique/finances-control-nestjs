import { Injectable } from '@nestjs/common';
import { CreateEarningDto } from './earning.dto';

@Injectable()
export class EarningRepository {
  private earnings: Array<CreateEarningDto> = [];

  insert(data: CreateEarningDto) {
    this.earnings.push(data);
  }

  getAll() {
    return this.earnings;
  }
}
