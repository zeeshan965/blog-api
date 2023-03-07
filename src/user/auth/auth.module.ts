import { Module } from '@nestjs/common';
import { UserModule } from '../user.module';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [UserModule],
  providers: [AuthGuard],
})
export class AuthModule {}
