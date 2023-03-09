import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '../entity/user.entity';
import { UserService } from '../user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /**
   * @param userService
   */
  constructor(private userService: UserService) {
    super();
  }

  /**
   * @param username
   * @param password
   */
  async validate(username: string, password: string): Promise<any> {
    console.log(username);
    console.log(password);
    //const ctx = GqlExecutionContext.create(context).getContext();
    //const { email, password } = ctx.req.body.variables;
    const user: User = await this.userService.findUserByEmail(username);
    if (!user) throw new UnauthorizedException();
    if (await bcrypt.compare(password, user.password)) {
      //ctx.user = user;
      return user;
    } else {
      throw new HttpException('Unauthenticated', HttpStatus.UNAUTHORIZED);
    }
  }
}
