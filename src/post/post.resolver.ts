import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '../guard/gql-jwt-auth.guard';
import { CurrentUser } from '../utils/current-user.decorator';
import { User } from '../user/entity/user.entity';
import { PostResponseDto } from './dto/post-response.dto';
import { createWriteStream } from 'fs';
import { FileUpload } from 'graphql-upload-minimal';
import { UploadScalar } from '../utils/graphql-upload';

@Resolver(() => Post)
@UseGuards(GqlJwtAuthGuard)
export class PostResolver {
  /**
   * @param postService
   */
  constructor(private readonly postService: PostService) {}

  /**
   * @param page
   * @param limit
   */
  @Query(() => PostResponseDto)
  async list(
    @Args({ name: 'page', type: () => Int }) page = 1,
    @Args({ name: 'limit', type: () => Int }) limit = 10,
  ) {
    const posts = await this.postService.paginate(page, limit);
    return {
      message: 'success!',
      status: 200,
      posts: posts,
      total: posts.length,
    };
  }

  /**
   * @param user
   * @param createPostInput
   */
  @Mutation(() => PostResponseDto)
  async createPost(
    @CurrentUser() user: User,
    @Args('createPostInput') createPostInput: CreatePostInput,
  ): Promise<PostResponseDto> {
    const post = await this.postService.create(createPostInput, user);
    return { message: 'success!', status: 200, post: post };
  }

  /**
   * @param updatePostInput
   */
  @Mutation(() => PostResponseDto)
  async updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    const post = await this.postService.update(updatePostInput);
    return { message: 'success!', status: 200, post: post };
  }

  /**
   * @param id
   */
  @Mutation(() => PostResponseDto)
  async removePost(@Args('id', { type: () => Int }) id: number) {
    const post = await this.postService.remove(id);
    return { message: 'success!', status: 200, deleted: post.affected };
  }

  /**
   *
   */
  @Query(() => PostResponseDto)
  async findAllPosts() {
    const posts: Post[] = await this.postService.findAll();
    return { message: 'success!', status: 200, posts: posts };
  }

  /**
   * @param id
   */
  @Query(() => PostResponseDto)
  async findOnePost(@Args('id', { type: () => Int }) id: number) {
    const post: Post = await this.postService.findOne(id);
    return { message: 'success!', status: 200, post: post };
  }

  /**
   * @param search
   */
  @Query(() => PostResponseDto)
  async searchPost(
    @Args({ name: 'search', type: () => String, defaultValue: '' })
    search: string,
  ) {
    const posts: Post[] = await this.postService.findAll(search);
    return {
      message: 'success!',
      status: 200,
      posts: posts,
      total: posts.length,
    };
  }

  /**
   * @param file
   */
  @Mutation(() => Boolean)
  async uploadFile(
    @Args({ name: 'file', type: () => UploadScalar })
    file: FileUpload,
  ): Promise<boolean> {
    console.log('Uploading file...');
    console.log(file);
    const { createReadStream, filename } = await file;
    const extension = filename.split('.')[1];
    console.log(filename);
    const path = `./uploads/${Date.now() / 1000}.${extension}`;
    console.log(path);
    return new Promise((resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(path))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false)),
    );
  }
}
