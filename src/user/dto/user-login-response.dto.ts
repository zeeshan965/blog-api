import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entity/user.entity';
import { ResponseDto } from './response.dto';

@ObjectType()
export class UserLoginResponseDto extends ResponseDto {
  @Field({ nullable: true })
  user?: User;
}
