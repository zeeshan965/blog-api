import { Module } from '@nestjs/common';
import { UserModule } from '../user.module';
import { AuthGuard } from '../../guard/auth.guard';
import { JwtGuard } from '../../guard/jwt.guard';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthGuard, JwtGuard, LocalStrategy, AuthResolver],
})
export class AuthModule {}
