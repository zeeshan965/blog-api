import { Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  /**
   * @param userService
   * @param jwtService
   */
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * @param username
   * @param password
   */
  async validateUser(username: string, password: string) {
    const user: User = await this.userService.findUserByEmail(username);
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }

    return null;
  }

  /**
   * @param user
   */
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      token: this.jwtService.sign(payload),
      message: 'success',
      status: 200,
    };
  }
}
