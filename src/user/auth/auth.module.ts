import { Module } from '@nestjs/common';
import { UserModule } from '../user.module';
import { AuthGuard } from '../../guard/auth.guard';
import { JwtGuard } from '../../guard/jwt.guard';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from './auth.resolver';
import { APP_GUARD } from '@nestjs/core';
import { GqlThrottlerGuard } from '../../guard/gql.throttler.guard';

@Module({
  imports: [UserModule, PassportModule],
  providers: [
    AuthGuard,
    JwtGuard,
    LocalStrategy,
    AuthResolver,
    { provide: APP_GUARD, useClass: GqlThrottlerGuard },
  ],
})
export class AuthModule {}
