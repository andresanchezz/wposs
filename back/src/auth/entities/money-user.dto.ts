import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MoneyUsers {
    @PrimaryGeneratedColumn()
    account_number: string;

    @Column()
    amount: number;
}