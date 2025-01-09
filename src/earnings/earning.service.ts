import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EarningEntity } from './earning.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEarningDto, UpdateEarningDto } from './earning.dto';

@Injectable()
export class EarningService {
  constructor(
    @InjectRepository(EarningEntity)
    private readonly repository: Repository<EarningEntity>,
  ) { }

  async getAll(): Promise<EarningEntity[]> {
    return this.repository.find();
  }

  async insert(dto: CreateEarningDto): Promise<void> {
    this.repository.insert(dto);
  }

  async update(id: string, dto: UpdateEarningDto): Promise<void> {
    this.repository.update({ id }, dto);
  }

  async delete(id: string): Promise<void> {
    this.repository.delete(id);
  }

  async getFromUser(userId: string): Promise<EarningEntity[]> {
    return this.repository.find({
      relations: {
        earningToUsers: true,
      },
      where: { earningToUsers: { userId } },
    });
  }
}
