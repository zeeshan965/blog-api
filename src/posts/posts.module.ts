import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Category } from './categories/entities/category.entity';
import { CategoriesModule } from './categories/categories.module';
import { graphqlUploadExpress } from 'graphql-upload-minimal';
import { CloudinaryService } from './cloudinary.service';
import { NextFunction, Request, Response } from 'express';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Category]), CategoriesModule],
  providers: [PostsResolver, PostsService, CloudinaryService],
  exports: [PostsService],
})
export class PostsModule {
  configure(consumer) {
    consumer.apply(
      (request: Request, response: Response, next: NextFunction) => {
        //multer
        next();
      },
    );
    consumer.apply(graphqlUploadExpress({ maxFiles: 10 })).forRoutes('graphql');
  }
}
