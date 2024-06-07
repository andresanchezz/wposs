import { Injectable } from '@nestjs/common';
import { WithdrawDto } from './dto/withdraw.dto';
import { DepositDto } from './dto/deposit.dto';
import { TransferDto } from './dto/transfer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactions } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/auth/entities/user.entity';
import { MoneyUsers } from 'src/auth/entities/money-user.dto';

@Injectable()
export class TransactionsService {

    constructor(
        @InjectRepository(Transactions)
        private readonly transactionsRepository: Repository<Transactions>,
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        @InjectRepository(MoneyUsers)
        private readonly moneyUsersRepository: Repository<MoneyUsers>,
    ) { }

    async withdraw(withdrawDto: WithdrawDto) {

        const { account, amount } = withdrawDto;

        const user = await this.usersRepository.findOne({ where: { account_number: withdrawDto.account } });

        if (!user) {
            return { message: 'Account not found' };
        }

        const amountByUser = await this.moneyUsersRepository.findOne({ where: { account_number: withdrawDto.account } });

        if (amountByUser.amount < amount) {
            return { message: 'Insufficient funds' };
        }

        const newAmount = amountByUser.amount - amount;

        await this.moneyUsersRepository.update({ account_number: account }, { amount: newAmount });

        const transaction = this.transactionsRepository.create({
            id_user: user.id,
            amount,
            type: 'withdraw',
        });

        await this.transactionsRepository.save(transaction);

        return { message: 'Withdrawal successful' };
    }

    async deposit(depositDto: DepositDto) {

        const { account, amount } = depositDto;

        const user = await this.usersRepository.findOne({ where: { account_number: depositDto.account } });

        if (!user) {
            return { message: 'Account not found' };
        }

        const amountByUser = await this.moneyUsersRepository.findOne({ where: { account_number: depositDto.account } });

        const newAmount = amountByUser.amount + amount;

        await this.moneyUsersRepository.update({ account_number: account }, { amount: newAmount });

        const transaction = this.transactionsRepository.create({
            id_user: user.id,
            amount,
            type: 'deposit',
        });

        await this.transactionsRepository.save(transaction);

        return { message: 'Deposit successful' };
    }

    async transfer(transferDto: TransferDto) {

        const { account, amount, to } = transferDto;

        const user = await this.usersRepository.findOne({ where: { account_number: transferDto.account } });

        if (!user) {
            return { message: 'Account not found' };
        }

        const userDestination = await this.usersRepository.findOne({ where: { account_number: transferDto.to } });

        if (!userDestination) {
            return { message: 'Account destination not found' };
        }

        if (user.account_number === userDestination.account_number) {
            return { message: 'You cannot transfer money to the same account' };
        }

        const amountByUser = await this.moneyUsersRepository.findOne({ where: { account_number: transferDto.account } });

        if (amountByUser.amount < amount) {
            return { message: 'Insufficient funds' };
        }

        const newAmount = amountByUser.amount - amount;

        await this.moneyUsersRepository.update({ account_number: account }, { amount: newAmount });

        const amountByUserDestination = await this.moneyUsersRepository.findOne({ where: { account_number: transferDto.to } });

        const newAmountDestination = amountByUserDestination.amount + amount;

        await this.moneyUsersRepository.update({ account_number: to }, { amount: newAmountDestination });

        const transaction = this.transactionsRepository.create({
            id_user: user.id,
            amount,
            type: 'transfer',
        });

        await this.transactionsRepository.save(transaction);

        return { message: 'Transfer successful' };

    }

    async getTransactions(account: string) {
        const user = await this.usersRepository.findOne({ where: { account_number: account } });

        if (!user) {
            return { message: 'Account not found' };
        }

        const transactions = await this.transactionsRepository.find({ where: { id_user: user.id } });

        return transactions;
    }

    async getAllTransactions() {
        return this.transactionsRepository.find();
    }
}
