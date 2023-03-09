import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '../entity/user.entity';
import { UserService } from '../user.service';
import * as bcrypt from 'bcrypt';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /**
   * @param userService
   */
  constructor(private userService: UserService) {
    super();
  }

  /**
   * This method was implemented to test REST route
   * @param username
   * @param password
   */
  /*async validate(username: string, password: string): Promise<any> {
    const user: User = await this.userService.findUserByEmail(username);
    if (!user) throw new UnauthorizedException();
    if (await bcrypt.compare(password, user.password)) {
      return user;
    } else {
      throw new HttpException('Unauthenticated', HttpStatus.UNAUTHORIZED);
    }
  }*/

  /**
   * Important note here
   * @param context
   */
  async validate(context: ExecutionContext): Promise<any> {
    console.log(context);
    const ctx = GqlExecutionContext.create(context).getContext();
    console.log(ctx);
    const { username, password } = ctx.req.body.variables;
    console.log(username);
    console.log(password);
    const user: User = await this.userService.findUserByEmail(username);
    if (!user) throw new UnauthorizedException();
    if (await bcrypt.compare(password, user.password)) {
      ctx.user = user;
      return user;
    } else {
      throw new HttpException('Unauthenticated', HttpStatus.UNAUTHORIZED);
    }
  }
}
