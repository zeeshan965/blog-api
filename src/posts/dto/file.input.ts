import { InputType, Field } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload-minimal';
import { UploadScalar } from '../../utils/graphql-upload';

@InputType()
export class FileInput {
  @Field(() => UploadScalar)
  file: FileUpload;
}
