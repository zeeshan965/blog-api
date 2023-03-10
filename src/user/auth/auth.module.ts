import { Module } from '@nestjs/common';
import { UserModule } from '../user.module';
import { AuthGuard } from '../../guard/auth.guard';
import { JwtGuard } from '../../guard/jwt.guard';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthGuard, JwtGuard, AuthService, LocalStrategy, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
