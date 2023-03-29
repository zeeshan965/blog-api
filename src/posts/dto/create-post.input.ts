import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { PostMedia } from '../entities/post.entity';
import { UploadScalar } from '../../utils/graphql-upload';
import { FileUpload } from 'graphql-upload-minimal';

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

  @IsEnum(PostMedia)
  @Field(() => String, { nullable: true })
  postMediaType?: string;

  @Field(() => UploadScalar, { nullable: true })
  postMedia?: FileUpload;

  // @IsNotEmpty()
  // @Field(() => String)
  // postMedia: string;
  //
  // @IsEnum(PostMedia)
  // @Field(() => String)
  // postMediaType?: string;
}
