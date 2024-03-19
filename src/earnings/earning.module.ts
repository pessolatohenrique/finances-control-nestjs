import { Module } from '@nestjs/common';
import { EarningController } from './earning.controller';
import { EarningRepository } from './earning.repository';

@Module({
  imports: [],
  controllers: [EarningController],
  providers: [EarningRepository],
})
export class EarningModule { }
