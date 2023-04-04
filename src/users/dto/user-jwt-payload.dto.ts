import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserJwtPayloadDto {
  @Field(() => ID, { nullable: true })
  id: number;

  @Field(() => String, { nullable: true })
  firstName: string;

  @Field(() => String, { nullable: true })
  lastName: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  role?: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}
