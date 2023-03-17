import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Category } from './category/entities/category.entity';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Category]), CategoryModule],
  providers: [PostResolver, PostService],
  exports: [PostService],
})
export class PostModule {}
