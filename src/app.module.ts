import { Module } from '@nestjs/common';
import { EarningModule } from './earnings/earning.module';
import { ConfigModule } from '@nestjs/config';
import { MySqlConfigService } from './config/mysql-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { RecipesModule } from './recipes/recipes.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: MySqlConfigService,
      inject: [MySqlConfigService],
    }),
    EarningModule,
    UserModule,
    RecipesModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
