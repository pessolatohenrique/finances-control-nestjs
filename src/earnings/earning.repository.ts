import { Injectable } from '@nestjs/common';
import { EarningEntity } from './earning.entity';

@Injectable()
export class EarningRepository {
  private earnings: Array<EarningEntity> = [];

  insert(data: EarningEntity) {
    this.earnings.push(data);
  }

  getAll() {
    return this.earnings;
  }

  verifyNameExists(name: string) {
    return this.earnings.some((earning) => earning.name === name);
  }
}
