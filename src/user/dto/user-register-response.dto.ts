import { User } from '../entity/user.entity';
import { ResponseDto } from './response.dto';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserRegisterResponseDto extends ResponseDto {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => String, { nullable: true })
  token?: string;
}
