import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ResponseDto } from '../../../utils/response.dto';
import { Comment } from '../entities/comment.entity';

@ObjectType()
export class CommentResponseDto extends ResponseDto {
  @Field(() => Comment, { nullable: true })
  comment?: Comment;

  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];

  @Field(() => Boolean, { nullable: true })
  deleted?: boolean;
}
