import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './user/auth/auth.guard';
import { User } from './user/entity/user.entity';
import { UserLoginResponseDto } from './user/dto/user-login-response.dto';
import { UserRegisterReqDto } from './user/dto/user-register-req.dto';

@Resolver(() => String)
export class AppResolver {
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
  @Query(() => UserLoginResponseDto)
  async register(
    @Args('data', { type: () => UserRegisterReqDto })
    data: UserRegisterReqDto,
  ) {
    console.log(data);
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
    return { user: user, message: 'success', status: 200 };
  }
}
