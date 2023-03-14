import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResponseDto {
  @Field(() => Number, { nullable: true })
  status: number;

  @Field(() => String, { nullable: true })
  message: string;
}
