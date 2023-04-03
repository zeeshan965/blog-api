import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { FileUpload } from 'graphql-upload-minimal';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: 'dccnwzbs1',
      api_key: '875942885728423',
      api_secret: 'aTGpdkhcyE8H-iQ7sIAydQEa7Ts',
    });
  }

  /**
   * @param file
   */
  async uploadFile(file: FileUpload): Promise<string> {
    const { createReadStream, filename } = file;
    const extension = filename.split('.')[1];

    const stream = createReadStream();
    return await new Promise((resolve, reject) => {
      const streamLoad = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          console.log(result);
          resolve(result.secure_url);
        } else {
          console.log(error.message);
          reject(error.message);
        }
      });

      stream.pipe(streamLoad);
    });
  }

  /**
   * @param file
   */
  async uploadLargeFile(file: FileUpload): Promise<string> {
    const { createReadStream, filename } = file;
    const extension = filename.split('.')[1];

    const stream = createReadStream();
    return await new Promise((resolve, reject) => {
      const streamLoad = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          console.log(result);
          resolve(result.secure_url);
        } else {
          console.log(error.message);
          reject(error.message);
        }
      });

      stream.pipe(streamLoad);
    });
  }
}
