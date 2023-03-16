import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @IsNotEmpty()
  @Field(() => String)
  message: string;

  @IsNotEmpty()
  @Field(() => Int, { nullable: true })
  postId: number;

  @Field(() => Int, { nullable: true })
  parentId?: number;
}
