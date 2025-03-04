import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { EarningEntity } from './earning.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateEarningDto,
  CreateEarningUserListDto,
  UpdateEarningDto,
  UpdateEarningUserDto,
} from './earning.dto';
import { EarningToUserEntity } from './earning-user.entity';

@Injectable()
export class EarningService {
  constructor(
    @InjectRepository(EarningEntity)
    private readonly earningRepository: Repository<EarningEntity>,
    @InjectRepository(EarningToUserEntity)
    private readonly earningUserRepository: Repository<EarningToUserEntity>,
  ) { }

  async getAll(): Promise<EarningEntity[]> {
    return this.earningRepository.find();
  }

  async insert(dto: CreateEarningDto): Promise<void> {
    this.earningRepository.insert(dto);
  }

  async update(id: string, dto: UpdateEarningDto): Promise<void> {
    this.earningRepository.update({ id }, dto);
  }

  async delete(id: string): Promise<void> {
    this.earningRepository.softDelete(id);
  }

  async getFromUser(userId: string): Promise<EarningEntity[]> {
    return this.earningRepository.find({
      relations: {
        earningToUsers: true,
      },
      where: { earningToUsers: { userId } },
    });
  }

  async insertFromUser(
    userId: string,
    dto: CreateEarningUserListDto,
  ): Promise<void> {
    const { earnings } = dto;

    for (const earning of earnings) {
      let existingEarning = await this.earningRepository.findOne({
        where: { name: earning.name },
      });

      existingEarning = await this.earningRepository.save({
        ...existingEarning,
        name: earning.name,
      });

      await this.earningUserRepository.save({
        ...earning,
        userId,
        earningId: existingEarning.id,
        value: earning.value,
        transaction_date: earning.transaction_date,
      });
    }
  }

  async getOneFromUser(userId: string, id: string): Promise<EarningEntity> {
    const result = await this.findOneByIdAndUser(userId, id);
    return { ...result, ...result.earningToUsers[0] };
  }

  async updateFromUser(
    userId: string,
    id: string,
    dto: UpdateEarningUserDto,
  ): Promise<void> {
    await this.findOneByIdAndUser(userId, id);

    await this.earningUserRepository.update({ userId, id }, dto);
  }

  async deleteFromUser(userId: string, id: string): Promise<void> {
    await this.earningUserRepository.softDelete({ userId, id });
  }

  private async findOneByIdAndUser(
    userId: string,
    id: string,
  ): Promise<EarningEntity> {
    const result = await this.earningRepository.findOne({
      relations: {
        earningToUsers: true,
      },
      where: { earningToUsers: { userId, id } },
    });

    if (!result) {
      throw new NotFoundException('Result not found');
    }

    return result;
  }
}
