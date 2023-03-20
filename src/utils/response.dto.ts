import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResponseDto {
  @Field(() => Number, { nullable: true })
  status: number;

  @Field(() => String, { nullable: true })
  message: string;

  @Field(() => Boolean, { nullable: true })
  deleted?: boolean;

  @Field(() => Int, { nullable: true })
  total?: number;
}
