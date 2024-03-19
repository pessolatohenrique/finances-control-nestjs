import { Module } from '@nestjs/common';
import { EarningModule } from './earnings/earning.module';

@Module({
  imports: [EarningModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
