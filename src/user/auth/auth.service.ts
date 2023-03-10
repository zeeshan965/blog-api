import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../entity/user.entity';

@Injectable()
export class AuthService {
  /**
   * @param userService
   */
  constructor(private readonly userService: UserService) {}

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
}
