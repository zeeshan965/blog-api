import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload';


@InputType()
export class UserUpdateProfileReqDto {
  @IsNotEmpty()
  @Field(() => String)
  profile_image: string;
}
