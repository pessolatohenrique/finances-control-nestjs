import { Module } from '@nestjs/common';
import { EarningController } from './earning.controller';
import { EarningRepository } from './earning.repository';
import { IsEarningAlreadyRegisteredConstraint } from './earning.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EarningEntity } from './earning.entity';
import { EarningService } from './earning.service';

@Module({
  imports: [TypeOrmModule.forFeature([EarningEntity])],
  controllers: [EarningController],
  providers: [
    EarningService,
    EarningRepository,
    IsEarningAlreadyRegisteredConstraint,
  ],
})
export class EarningModule { }
