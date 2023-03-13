import { User } from '../entity/user.entity';
import { ResponseDto } from './response.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserJwtPayloadDto } from './user-jwt-payload.dto';

@ObjectType()
export class UserRegisterResponseDto extends ResponseDto {
  @Field(() => UserJwtPayloadDto, { nullable: true })
  user?: UserJwtPayloadDto;

  @Field(() => String, { nullable: true })
  token?: string;
}
