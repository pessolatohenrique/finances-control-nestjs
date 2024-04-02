import { Injectable } from '@nestjs/common';
import { EarningEntity } from './earning.entity';

@Injectable()
export class EarningRepository {
  private earnings: Array<EarningEntity> = [];

  insert(data: EarningEntity): void {
    this.earnings.push(data);
  }

  getAll(): Array<EarningEntity> {
    return this.earnings;
  }

  verifyNameExists(name: string): boolean {
    return this.earnings.some((earning) => earning.name === name);
  }

  getOne(id: string): EarningEntity {
    const result = this.earnings.find((item) => item.id === id);

    if (!result) {
      throw Error('result not found');
    }

    return result;
  }

  update(id: string, data: Partial<EarningEntity>): EarningEntity {
    const result = this.getOne(id);

    for (const [key, value] of Object.entries(data)) {
      if (key === 'id') return;
      result[key] = value;
    }

    return result;
  }

  delete(id: string): void {
    const result = this.earnings.find((item) => item.id === id);

    if (!result) {
      throw Error('result not found');
    }

    const resultFilter = this.earnings.filter((item) => item.id !== id);

    this.earnings = resultFilter;
  }
}
