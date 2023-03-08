import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResponseDto {
  @Field(() => Number)
  status: number;

  @Field(() => String)
  message: string;
}
