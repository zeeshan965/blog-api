import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegisterReqDto } from './dto/user-register-req.dto';

@Injectable()
export class UserService {
  /**
   * @param userRepository
   */
  constructor(
    @InjectRepository(User) public readonly userRepository: Repository<User>,
  ) {}

  /**
   * base route
   */
  getWelcome(user): { message: string; user?: any } {
    return { message: 'welcome!', user: user };
  }

  /**
   * @param email
   */
  async findUserByEmail(email: string) {
    return await this.userRepository.findOneOrFail({
      where: { email: email },
    });
  }

  /**
   * @param id
   */
  async findUserById(id: number) {
    return await this.userRepository.findOneOrFail({
      where: { id: id },
      select: [
        'firstName',
        'lastName',
        'email',
        'role',
        'isActive',
        'createdAt',
      ],
    });
  }

  /**
   * @param userRegister
   */
  async registerUser(userRegister: UserRegisterReqDto): Promise<User> {
    const user = new User();
    user.firstName = userRegister.firstName;
    user.lastName = userRegister.lastName;
    user.email = userRegister.email;
    user.password = userRegister.confirmPassword;
    user.role = userRegister.role;

    return await user.save();
  }
}
