import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { PostsModule } from '../posts.module';
import { Post } from '../entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Post]), PostsModule],
  providers: [CommentsResolver, CommentsService],
})
export class CommentsModule {}
