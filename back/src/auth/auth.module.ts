import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { JwtStrategy } from './strategies/jwt.strategy';
import { MoneyUsers } from './entities/money-user.dto';
import { AuthController } from './auth.controller';

import { Users } from './entities/user.entity';
import { Roles } from './entities/role.entity';
import { AuthService } from './auth.service';

import { envVars } from 'src/common';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule],
  imports: [
    TypeOrmModule.forFeature([Users, Roles, MoneyUsers]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: envVars.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ]
})
export class AuthModule { }
