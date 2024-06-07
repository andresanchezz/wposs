import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Roles } from './role.entity';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    identification: string;

    @Column()
    account_number: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToOne(() => Roles)
    @JoinColumn({ name: 'id' })
    id_role: Roles;
}