import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserRegisterResponseDto } from '../dto/user-register-response.dto';
import { UserRegisterReqDto } from '../dto/user-register-req.dto';
import { UserLoginResponseDto } from '../dto/user-login-response.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guard/auth.guard';
import { User } from '../entity/user.entity';
import * as jwt from 'jsonwebtoken';
import { JwtGuard } from '../../guard/jwt.guard';
import { RoleGuard, Roles } from '../../guard/role.guard';
import { GqlAuthGuard } from '../../guard/gql-auth.guard';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user.service';

@Resolver(() => User)
export class AuthResolver {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {}

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

  /**
   *
   */
  @Mutation(() => UserRegisterResponseDto)
  @UseGuards(GqlAuthGuard)
  localLogin(
    @Args({ name: 'username', type: () => String }) username: string,
    @Args({ name: 'password', type: () => String }) password: string,
    @Context('user') user: User,
  ) {
    return {
      status: 200,
      message: 'this will be a normal user route!',
      user: user,
    };
  }
}
