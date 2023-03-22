import { InputType, Field } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload-minimal';

@InputType()
export class FileInput {
  @Field(() => GraphQLUpload, { nullable: true })
  file: any;
}
