import { Module } from '@nestjs/common';
import { EarningController } from './earning.controller';
import { EarningRepository } from './earning.repository';
import { IsEarningAlreadyRegisteredConstraint } from './earning.validator';

@Module({
  imports: [],
  controllers: [EarningController],
  providers: [EarningRepository, IsEarningAlreadyRegisteredConstraint],
})
export class EarningModule { }
