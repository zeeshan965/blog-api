import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from '../entities/post.entity';
import { ResponseDto } from '../../utils/response.dto';

@ObjectType()
export class PostResponseDto extends ResponseDto {
  @Field(() => Post, { nullable: true })
  post?: Post;

  @Field(() => [Post], { nullable: true })
  posts?: Post[];
}
