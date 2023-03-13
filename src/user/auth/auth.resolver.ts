import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserRegisterResponseDto } from '../dto/user-register-response.dto';
import { UserRegisterReqDto } from '../dto/user-register-req.dto';
import { UserLoginResponseDto } from '../dto/user-login-response.dto';
import { Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guard/auth.guard';
import { User } from '../entity/user.entity';
import * as jwt from 'jsonwebtoken';
import { JwtGuard } from '../../guard/jwt.guard';
import { RoleGuard, Roles } from '../../guard/role.guard';
import { GqlLocalAuthGuard } from '../../guard/gql-local-auth.guard';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user.service';
import { AuthService } from './auth.service';
import { GqlJwtAuthGuard } from '../../guard/gql-jwt-auth.guard';
import { CurrentUser } from '../../utils/current-user.decorator';
import { UserJwtPayloadDto } from '../dto/user-jwt-payload.dto';
import { UserUpdateProfileReqDto } from '../dto/user-update-profile-req.dto';

@Resolver(() => User)
export class AuthResolver {
  /**
   * @param configService
   * @param userService
   * @param authService
   */
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private authService: AuthService,
  ) {}

  /** -------------------------------------------- Normal Register Route --------------------------------------------- */
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
  /** ------------------------------------------ End Normal Register Route ------------------------------------------- */

  /** ------------------------------------------- Login Using Jsonwebtoken ------------------------------------------- */
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
  /** ----------------------------------------- End Login Using Jsonwebtoken ------------------------------------------ */

  /** ---------------------------------------- Jsonwebtoken & Role Base Routes ---------------------------------------- */
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

  /** -------------------------------------- Login Using Passport Local Strategy -------------------------------------- */
  /**
   * @param username
   * @param password
   * @param user
   */
  @Mutation(() => UserRegisterResponseDto)
  @UseGuards(GqlLocalAuthGuard)
  localStrategyLogin(
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

  /**
   * @param username
   * @param password
   * @param user
   */
  @Mutation(() => UserRegisterResponseDto)
  @UseGuards(GqlLocalAuthGuard)
  localStrategyGetUser(
    @Args({ name: 'username', type: () => String }) username: string,
    @Args({ name: 'password', type: () => String }) password: string,
    @Context('user') user: User,
  ) {
    return { user: user };
  }
  /** ------------------------------------ End Login Using Passport Local Strategy ------------------------------------ */

  /** ----------------------------------- Login Using Passport Local, JWT Strategy ------------------------------------ */
  /**
   * @param username
   * @param password
   * @param user
   */
  @Mutation(() => UserRegisterResponseDto)
  @UseGuards(GqlLocalAuthGuard)
  jwtLogin(
    @Args({ name: 'username', type: () => String }) username: string,
    @Args({ name: 'password', type: () => String }) password: string,
    @Context('user') user: User,
  ) {
    return this.authService.login(user);
  }
  /** --------------------------------- End Login Using Passport Local, JWT Strategy ---------------------------------- */

  /** ------------------------------------- Protected routes Passport JWT Strategy ------------------------------------ */
  /**
   * @param user
   */
  @Query(() => UserRegisterResponseDto)
  @UseGuards(GqlJwtAuthGuard)
  jwtStrategyGetUser(@CurrentUser() user: UserJwtPayloadDto) {
    return { status: 200, message: 'success', user: user };
  }

  /**
   * @param user
   * @param userUpdateProfileReqDto
   */
  @Mutation(() => String)
  @UseGuards(GqlJwtAuthGuard)
  updateAvatar(
    @CurrentUser() user: UserJwtPayloadDto,
    @Args({
      name: 'userUpdateProfileReqDto',
      type: () => UserUpdateProfileReqDto,
    })
    userUpdateProfileReqDto: UserUpdateProfileReqDto,
  ) {
    console.log(userUpdateProfileReqDto.profile_image);
    return 'success';
  }
  /** ----------------------------------- End Protected routes Passport JWT Strategy ---------------------------------- */
}
