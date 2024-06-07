import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { Transactions } from './entities/transaction.entity';
import { Users } from 'src/auth/entities/user.entity';
import { MoneyUsers } from 'src/auth/entities/money-user.dto';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [TypeOrmModule.forFeature([Transactions, Users, MoneyUsers])],
})
export class TransactionsModule {}
