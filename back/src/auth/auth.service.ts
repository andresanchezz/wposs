import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

import { MoneyUsers } from './entities/money-user.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

import { Users } from './entities/user.entity';
import { Roles } from './entities/role.entity';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
    @InjectRepository(MoneyUsers)
    private readonly moneyUsersRepository: Repository<MoneyUsers>,
  ) { }

  async login(loginAuthDto: LoginAuthDto) {


    const user = await this.userRepository.createQueryBuilder('user')
      .innerJoinAndSelect('user.id_role', 'id_role')
      .where('user.email = :email', { email: loginAuthDto.email })
      .getOne();

    if (!user) {
      throw new ForbiddenException('Invalid email or password');
    }

    const isPasswordMatch = bcrypt.compareSync(loginAuthDto.password, user.password);

    if (!isPasswordMatch) {
      throw new ForbiddenException('Invalid email or password');
    }

    const amountOfMoney = await this.moneyUsersRepository.findOne({ where: { account_number: user.account_number } });

    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      idUser: user.id,
      accountNumber: user.account_number,
      id_role: user.id_role.id,
      email: user.email,
      amount: amountOfMoney.amount
    };
  }

  async register(createAuthDto: CreateAuthDto) {

    const user = await this.userRepository.findOne({ where: { email: createAuthDto.email } });

    if (user) {
      throw new ForbiddenException('Email already exists');
    }

    const hashedPassword = bcrypt.hashSync(createAuthDto.password, 10);

    const account_number = uuidv4();
    const amount = 1000000;

    const roles = await this.rolesRepository.findOne({ where: { id: createAuthDto.id_role } });

    if (!roles) {
      throw new ForbiddenException('Role not found');
    }

    const newUser = this.userRepository.create({
      email: createAuthDto.email,
      name: createAuthDto.name,
      identification: createAuthDto.identification,
      id_role: roles,
      account_number,
      password: hashedPassword
    });

    await this.userRepository.save(newUser);

    const moneyUser = this.moneyUsersRepository.create({
      account_number,
      amount,
    });

    await this.moneyUsersRepository.save(moneyUser);

    delete newUser.password;
    delete newUser.account_number

    return newUser;
  }

  roles() {
    return this.rolesRepository.find();
  }
}
