import { CreateAttachmentInput } from './create-attachment.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAttachmentInput extends PartialType(CreateAttachmentInput) {
  @Field(() => Int)
  id: number;
}
