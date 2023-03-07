import { User } from '../entity/user.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginResponseDto {
  @Field(() => Int)
  status: number;

  @Field(() => String)
  message: string;

  @Field(() => User)
  data: User;
}
