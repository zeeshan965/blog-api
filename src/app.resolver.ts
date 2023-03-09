import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { User } from './user/entity/user.entity';
import { UserLoginResponseDto } from './user/dto/user-login-response.dto';
import { UserRegisterReqDto } from './user/dto/user-register-req.dto';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { JwtGuard } from './user/auth/jwt.guard';
import { UserRegisterResponseDto } from './user/dto/user-register-response.dto';
import { UserService } from './user/user.service';
import { RoleGuard, Roles } from './user/auth/role.guard';
import { AuthGuard as PassportGuard } from '@nestjs/passport';
import { AuthGuard } from './user/auth/auth.guard';

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
  @UseGuards(PassportGuard('local'))
  index(
    @Args({ name: 'username', type: () => String }) username: string,
    @Args({ name: 'password', type: () => String }) password: string,
  ): string {
    return 'Nest JS GQL';
  }

  /**
   * @param data
   */
  @Mutation(() => UserRegisterResponseDto)
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
  @Mutation(() => UserLoginResponseDto)
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
    return { status: 200, message: 'success', user: user };
  }

  /**
   * @param user
   */
  @Query(() => UserRegisterResponseDto)
  @UseGuards(JwtGuard, new RoleGuard(Roles.ADMIN))
  getAdmin(@Context('user') user: User) {
    return { status: 200, message: 'this will be a Admin route!', user: user };
  }

  /**
   * @param user
   */
  @Query(() => UserRegisterResponseDto)
  @UseGuards(JwtGuard, new RoleGuard(Roles.NORMAL_USER))
  getAuthLoggedUser(@Context('user') user: User) {
    return {
      status: 200,
      message: 'this will be a normal user route!',
      user: user,
    };
  }
}
