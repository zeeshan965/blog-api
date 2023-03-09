import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAttachmentInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
