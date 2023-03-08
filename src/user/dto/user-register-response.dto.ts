import { User } from '../entity/user.entity';
import { ResponseDto } from './response.dto';
import { Field } from '@nestjs/graphql';

export class UserRegisterResponseDto extends ResponseDto {
  @Field({ nullable: true })
  user?: User;
}
