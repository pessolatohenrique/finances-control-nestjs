import { Injectable } from '@nestjs/common';

@Injectable()
export class EarningRepository {
  private earnings: Array<any> = [];

  insert(data) {
    this.earnings.push(data);
  }

  getAll() {
    return this.earnings;
  }
}
