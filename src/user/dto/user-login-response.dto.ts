import { Field, ObjectType } from '@nestjs/graphql';
import { ResponseDto } from './response.dto';

@ObjectType()
export class UserLoginResponseDto extends ResponseDto {
  @Field(() => String)
  token: string;
}
