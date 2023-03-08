import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './user/auth/auth.guard';
import { User } from './user/entity/user.entity';
import { UserLoginResponseDto } from './user/dto/user-login-response.dto';
import { UserRegisterReqDto } from './user/dto/user-register-req.dto';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { JwtGuard } from './user/auth/jwt.guard';
import { UserRegisterResponseDto } from './user/dto/user-register-response.dto';
import { UserService } from './user/user.service';

@Resolver(() => String)
export class AppResolver {
  /**
   * @param configService
   * @param userService
   */
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  /**
   *
   */
  @Query(() => String)
  index(): string {
    return 'Nest JS GQL';
  }

  /**
   * @param data
   */
  @Query(() => UserRegisterResponseDto)
  async register(
    @Args({ name: 'data', type: () => UserRegisterReqDto })
    data: UserRegisterReqDto,
  ) {
    const user = await this.userService.registerUser(data);
    return { user: user.toJSON(), message: 'success', status: 200 };
  }

  /**
   * @param email
   * @param password
   * @param user
   */
  @Query(() => UserLoginResponseDto)
  @UseGuards(AuthGuard)
  async login(
    @Args({ name: 'email', type: () => String }) email: string,
    @Args({ name: 'password', type: () => String }) password: string,
    @Context('user') user: User,
  ) {
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, this.configService.get('jwt_secret_key'), {
      expiresIn: this.configService.get('jwt_expiry'),
    });
    return { token: token, message: 'success', status: 200 };
  }

  /**
   * @param user
   */
  @Query(() => UserRegisterResponseDto)
  @UseGuards(JwtGuard)
  getUser(@Context('user') user: User) {
    console.log(user);
    return { status: 200, message: 'success', user: user };
  }
}
