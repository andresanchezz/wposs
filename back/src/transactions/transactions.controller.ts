import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

import { WithdrawDto } from './dto/withdraw.dto';
import { TransferDto } from './dto/transfer.dto';
import { DepositDto } from './dto/deposit.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('withdraw')
  withdraw(@Body() withdrawDto: WithdrawDto) {
    return this.transactionsService.withdraw(withdrawDto);
  }

  @Post('deposit')
  deposit(@Body() depositDto: DepositDto) {
    return this.transactionsService.deposit(depositDto);
  }

  @Post('transfer')
  transfer(@Body() transferDto: TransferDto) {
    return this.transactionsService.transfer(transferDto);
  }

  @Get(":account")
  getTransactions(@Param("account") account: string) {
    return this.transactionsService.getTransactions(account);
  }

  @Get()
  getAllTransactions() {
    return this.transactionsService.getAllTransactions();
  }
}
