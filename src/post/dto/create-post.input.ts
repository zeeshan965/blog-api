import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { PostMedia } from '../entities/post.entity';

@InputType()
export class CreatePostInput {
  @IsNotEmpty()
  @Field(() => String)
  title: string;

  @IsNotEmpty()
  @Field(() => String)
  description: string;

  @Field(() => Boolean, { defaultValue: false })
  published?: boolean;

  @Field(() => [Int], { nullable: true })
  categories?: number[];
  // @IsNotEmpty()
  // @Field(() => String)
  // postMedia: string;
  //
  // @IsEnum(PostMedia)
  // @Field(() => String)
  // postMediaType?: string;
}
