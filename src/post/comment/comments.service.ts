import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { User } from '../../user/entity/user.entity';

@Injectable()
export class CommentsService {
  /**
   * @param commentRepository
   */
  constructor(
    @InjectRepository(Comment)
    public readonly commentRepository: Repository<Comment>,
  ) {}

  /**
   * @param createCommentInput
   * @param user
   */
  create(createCommentInput: CreateCommentInput, user: User) {
    const comment = this.commentRepository.create({
      ...createCommentInput,
      author: user,
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
}
