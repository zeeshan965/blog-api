import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user.service';
import * as bcrypt from 'bcrypt';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../entity/user.entity';

@Injectable()
export class PassportLocalStrategy extends PassportStrategy(Strategy) {
  /**
   * @param userService
   */
  constructor(private userService: UserService) {
    super();
  }

  /**
   * @param context
   */
  async validate(context: ExecutionContext): Promise<any> {
    console.log(213);
    const ctx = GqlExecutionContext.create(context).getContext();
    const { email, password } = ctx.req.body.variables;
    const user: User = await this.userService.findUserByEmail(email);
    if (!user) throw new UnauthorizedException();
    if (await bcrypt.compare(password, user.password)) {
      ctx.user = user;
      return user;
    } else {
      throw new HttpException('Unauthenticated', HttpStatus.UNAUTHORIZED);
    }
  }
}
