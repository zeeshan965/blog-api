import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from '../entities/post.entity';
import { ResponseDto } from '../../user/dto/response.dto';

@ObjectType()
export class PostResponseDto extends ResponseDto {
  @Field(() => Post, { nullable: true })
  post?: Post;

  @Field(() => [Post], { nullable: true })
  posts?: Post[];

  @Field(() => Boolean, { nullable: true })
  deleted?: boolean;
}
