import {
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
  async validate(username: string, password: string): Promise<any> {
    const user: User = await this.userService.findUserByEmail(username);
    if (!user) throw new UnauthorizedException();
    if (await bcrypt.compare(password, user.password)) {
      return user.toJSON();
    } else {
      throw new HttpException('Unauthenticated', HttpStatus.UNAUTHORIZED);
    }
  }
}
