import { Injectable } from '@nestjs/common';
import { UploadApiOptions, v2 as cloudinary } from 'cloudinary';
import { FileUpload } from 'graphql-upload-minimal';
import { generateRandomString } from '../utils/app.utils';
import { join } from 'path';

@Injectable()
export class CloudinaryService {
  private options: UploadApiOptions = {
    folder: 'samples/people/',
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    discard_original_filename: true,
  };

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
  async uploadStream(file: FileUpload): Promise<string> {
    const { createReadStream, filename } = file;
    const extension = filename.split('.')[1];
    this.options.filename_override = `${generateRandomString(
      10,
    )}_${Date.now()}`;
    const stream = createReadStream();
    return await new Promise((resolve, reject) => {
      const streamLoad = cloudinary.uploader.upload_stream(
        this.options,
        (error, result) => {
          if (result) {
            console.log(result);
            resolve(result.secure_url);
          } else {
            console.log(error.message);
            reject(error.message);
          }
        },
      );

      stream.pipe(streamLoad);
    });
  }

  /**
   * @param file
   */
  async uploadFile(file: string): Promise<string> {
    console.log(file);
    this.options.filename_override = file;
    const path = join(process.cwd(), 'public/uploads/' + file);
    const result = await cloudinary.uploader.upload(path, this.options);

    return result.secure_url;
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

  /**
   * @param public_id
   */
  async removeFile(public_id: string) {
    return cloudinary.uploader.destroy(public_id, (error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.log(result);
      }
    });
  }
}
