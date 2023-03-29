import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { CommentResponseDto } from './dto/comment-response.dto';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '../../guards/gql-jwt-auth.guard';
import { CurrentUser } from '../../utils/current-user.decorator';
import { User } from '../../users/entity/user.entity';

@Resolver(() => Comment)
@UseGuards(GqlJwtAuthGuard)
export class CommentsResolver {
  /**
   * @param commentsService
   */
  constructor(private readonly commentsService: CommentsService) {}

  /**
   * @param user
   * @param createCommentInput
   */
  @Mutation(() => CommentResponseDto)
  async createComment(
    @CurrentUser() user: User,
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    const comment = await this.commentsService.create(createCommentInput, user);
    console.log(comment);
    return { message: 'success!', status: 200, comment: comment };
  }

  /**
   * @param updateCommentInput
   */
  @Mutation(() => CommentResponseDto)
  async updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ) {
    const comment = await this.commentsService.update(updateCommentInput);
    if (!(comment instanceof Comment)) return { ...comment };

    return { message: 'success!', status: 200, comment: comment };
  }

  /**
   * @param id
   */
  @Mutation(() => CommentResponseDto)
  async removeComment(@Args('id', { type: () => Int }) id: number) {
    const comment = await this.commentsService.remove(id);
    return { message: 'success!', status: 200, deleted: comment.affected };
  }

  /**
   * @param id
   */
  @Query(() => CommentResponseDto)
  async findOneComment(@Args('id', { type: () => Int }) id: number) {
    const comment: Comment = await this.commentsService.findOne(id);
    return { message: 'success!', status: 200, comment: comment };
  }

  /**
   * @param postId
   */
  @Query(() => CommentResponseDto)
  async getPostComments(@Args('postId', { type: () => Int }) postId: number) {
    const comments: Comment[] = await this.commentsService.getPostComments(
      postId,
    );

    return {
      message: 'success!',
      status: 200,
      total: comments.length,
      comments: comments,
    };
  }

  /**
   * Resolves field
   * @param comment
   * @returns reply
   */
  @ResolveField(() => [Comment])
  async reply(@Parent() comment: Comment): Promise<Comment[]> {
    return await this.commentsService.fetchReplies(comment);
  }
}
