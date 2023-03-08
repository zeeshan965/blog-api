import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { MESSAGES, REGEX } from '../../utils/app.utils';

/** Class validator was used for the purpose of validating REST API calls */
@InputType()
export class UserRegisterReqDto {
  @IsNotEmpty()
  @Field(() => String)
  firstName: string;

  @IsNotEmpty()
  @Field(() => String)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @Length(8, 12)
  @Field(() => String)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  password: string;

  @IsNotEmpty()
  @Length(8, 12)
  @Field(() => String)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  confirmPassword: string;

  @IsNotEmpty()
  @Field(() => String)
  role: string;
}
