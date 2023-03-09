import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AttachmentService } from './attachment.service';
import { Attachment } from './entities/attachment.entity';
import { CreateAttachmentInput } from './dto/create-attachment.input';
import { UpdateAttachmentInput } from './dto/update-attachment.input';

@Resolver(() => Attachment)
export class AttachmentResolver {
  constructor(private readonly attachmentService: AttachmentService) {}

  @Mutation(() => Attachment)
  createAttachment(@Args('createAttachmentInput') createAttachmentInput: CreateAttachmentInput) {
    return this.attachmentService.create(createAttachmentInput);
  }

  @Query(() => [Attachment], { name: 'attachment' })
  findAll() {
    return this.attachmentService.findAll();
  }

  @Query(() => Attachment, { name: 'attachment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.attachmentService.findOne(id);
  }

  @Mutation(() => Attachment)
  updateAttachment(@Args('updateAttachmentInput') updateAttachmentInput: UpdateAttachmentInput) {
    return this.attachmentService.update(updateAttachmentInput.id, updateAttachmentInput);
  }

  @Mutation(() => Attachment)
  removeAttachment(@Args('id', { type: () => Int }) id: number) {
    return this.attachmentService.remove(id);
  }
}
