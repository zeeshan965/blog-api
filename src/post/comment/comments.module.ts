import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentsResolver, CommentsService],
})
export class CommentsModule {}
