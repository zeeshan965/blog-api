import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, IsNull, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { User } from '../../user/entity/user.entity';
import { Post } from '../entities/post.entity';

@Injectable()
export class CommentsService {
  /**
   * @param commentRepository
   * @param postRepository
   */
  constructor(
    @InjectRepository(Comment)
    public readonly commentRepository: Repository<Comment>,
    @InjectRepository(Post) public readonly postRepository: Repository<Post>,
  ) {}

  /**
   * @param createCommentInput
   * @param user
   */
  async create(createCommentInput: CreateCommentInput, user: User) {
    const post = await this.postRepository.findOne({
      where: { id: createCommentInput.postId },
    });

    const comment = this.commentRepository.create({
      ...createCommentInput,
      author: user,
      post: post,
    });

    return comment.save();
  }

  /**
   * @param updateCommentInput
   */
  async update(updateCommentInput: UpdateCommentInput) {
    try {
      const { id, ...updates } = updateCommentInput;
      const comment = await this.commentRepository.findOneOrFail({
        where: { id: id },
        relations: { author: true },
      });
      return this.commentRepository.save(Object.assign(comment, updates));
    } catch (error) {
      return {
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        category: new Comment(),
      };
    }
  }

  /**
   * @param id
   */
  remove(id: number) {
    return this.commentRepository.delete(id);
  }

  /**
   *
   */
  findAll() {
    return this.commentRepository.find({
      relations: { author: true },
    });
  }

  /**
   * @param id
   */
  findOne(id: number) {
    return this.commentRepository.findOneOrFail({
      where: { id: id },
      relations: {
        author: true,
      },
    });
  }

  /**
   * @param postId
   */
  async getPostComments(postId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: {
        post: {
          id: postId,
        },
        parent: {
          id: IsNull(),
        },
      },
      order: {
        id: 'ASC',
      },
    });
  }
}
