import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user.service';
import { User } from '../entity/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  /**
   * @param context
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const { email, password } = ctx.req.body.variables;
    const user: User = await this.userService.findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      ctx.user = user;
      return true;
    } else {
      throw new HttpException('Unauthenticated', HttpStatus.UNAUTHORIZED);
    }
  }
}
