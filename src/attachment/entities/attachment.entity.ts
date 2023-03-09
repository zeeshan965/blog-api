import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Attachment {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
