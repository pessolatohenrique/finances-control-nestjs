import { Module } from '@nestjs/common';
import { EarningModule } from './earnings/earning.module';
import { ConfigModule } from '@nestjs/config';
import { MySqlConfigService } from './config/mysql-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: MySqlConfigService,
      inject: [MySqlConfigService],
    }),
    EarningModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
