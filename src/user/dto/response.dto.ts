import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResponseDto {
  @Field({ nullable: true })
  status?: number;

  @Field({ nullable: true })
  message?: string;
}
