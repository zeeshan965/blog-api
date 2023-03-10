import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /**
   * @param authService
   */
  constructor(private authService: AuthService) {
    super();
  }

  /**
   * This method was implemented to test REST route
   * @param username
   * @param password
   */
  async validate(username: string, password: string): Promise<any> {
    const user: User | null = await this.authService.validateUser(
      username,
      password,
    );

    if (!user) throw new UnauthorizedException();
    return user;
  }
}
