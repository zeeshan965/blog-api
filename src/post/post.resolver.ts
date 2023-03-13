import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '../guard/gql-jwt-auth.guard';
import { CurrentUser } from '../utils/current-user.decorator';
import { UserRegisterResponseDto } from '../user/dto/user-register-response.dto';
import { UserJwtPayloadDto } from '../user/dto/user-jwt-payload.dto';
import { User } from '../user/entity/user.entity';
import { PostResponseDto } from './dto/post-response.dto';

@Resolver(() => Post)
@UseGuards(GqlJwtAuthGuard)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => PostResponseDto)
  async createPost(
    @CurrentUser() user: User,
    @Args('createPostInput') createPostInput: CreatePostInput,
  ) {
    const post = await this.postService.create(createPostInput, user);
    return { post: post };
  }

  @Query(() => [Post], { name: 'post' })
  findAll() {
    return this.postService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findOne(id);
  }

  @Mutation(() => Post)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => Post)
  removePost(@Args('id', { type: () => Int }) id: number) {
    return this.postService.remove(id);
  }
}
