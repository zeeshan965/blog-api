import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @IsNotEmpty()
  @Field(() => String)
  message: string;

  @IsNotEmpty()
  @Field(() => ID, { nullable: true })
  postId: number;

  @Field(() => ID, { nullable: true })
  parentId?: number;
}
