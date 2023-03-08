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
  getWelcome(): { message: string } {
    return { message: 'welcome!' };
  }

  /**
   * @param email
   */
  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email: email },
    });
  }

  /**
   * @param id
   */
  async findUserById(id: number) {
    return await this.userRepository.findOne({
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
