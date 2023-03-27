import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from '../user/entity/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  /**
   * @param context
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    let variables = ctx.req.body.variables;
    if (typeof variables === 'string') variables = JSON.parse(variables);

    const { email, password } = variables;
    const user: User = await this.userService.findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      ctx.user = user.toJSON();
      return true;
    } else {
      throw new HttpException('Unauthenticated', HttpStatus.UNAUTHORIZED);
    }
  }
}
