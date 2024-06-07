import { Users } from 'src/auth/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Transactions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_user: number;

    @Column()
    amount: number;

    @Column()
    type: string;

    @ManyToOne(() => Users)
    @JoinColumn({ name: 'id' })
    user: Users;
}