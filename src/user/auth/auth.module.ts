import { Module } from '@nestjs/common';
import { UserModule } from '../user.module';
import { AuthGuard } from './auth.guard';
import { JwtGuard } from './jwt.guard';
import { PassportLocalStrategy } from './passport.local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthGuard, JwtGuard, PassportLocalStrategy],
})
export class AuthModule {}
