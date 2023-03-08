import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { MESSAGES, REGEX } from '../../utils/app.utils';

/** Class validator was used for the purpose of validating REST API calls */
@InputType()
export class UserRegisterReqDto {
  @IsNotEmpty()
  @Field(() => String, { name: 'first_name' })
  firstName: string;

  @IsNotEmpty()
  @Field(() => String, { name: 'last_name' })
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @Field(() => String, { name: 'email' })
  email: string;

  @IsNotEmpty()
  @Length(8, 12)
  @Field(() => String, { name: 'password' })
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  password: string;

  @IsNotEmpty()
  @Length(8, 12)
  @Field(() => String, { name: 'confirm_password' })
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  confirmPassword: string;
}
