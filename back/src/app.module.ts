import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envVars } from './common';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      username: envVars.DB_USER,
      password: envVars.DB_PASS,
      host: envVars.DB_HOST,
      port: envVars.DB_PORT,
      database: envVars.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
    AuthModule, TransactionsModule],
  controllers: [],
  providers: [],
})

export class AppModule { }
