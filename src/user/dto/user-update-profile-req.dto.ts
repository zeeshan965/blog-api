import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UserUpdateProfileReqDto {
  @IsNotEmpty()
  @Field(() => String)
  profile_image: string;
}
