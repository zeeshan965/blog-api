import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './user/auth/auth.guard';
import { User } from './user/entity/user.entity';
import { LoginResponseDto } from './user/dto/login-response.dto';

@Resolver(() => String)
export class AppResolver {
  @Query(() => String)
  index(): string {
    return 'Nest JS GQL';
  }

  @Query(() => LoginResponseDto)
  @UseGuards(AuthGuard)
  async login(
    @Args({ name: 'email', type: () => String }) email: string,
    @Args({ name: 'password', type: () => String }) password: string,
    @Context('user') user: User,
  ): Promise<LoginResponseDto> {
    return { data: user, message: '', status: 200 };
  }
}
