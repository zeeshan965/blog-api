import { GraphQLScalarType } from 'graphql';
import { Upload } from 'graphql-upload-minimal';

export const UploadScalar = new GraphQLScalarType({
  name: 'Upload',
  description: 'The `Upload` scalar type represents a file upload.',
  parseValue: (value: Upload) => {
    console.log(value);
    return value.file;
  },
  parseLiteral: (ast) => {
    console.log(ast);
    throw new Error('Upload literal unsupported.');
  },
  serialize: (value) => {
    console.log(value);
    throw new Error('Upload serialization unsupported.');
  },
});
