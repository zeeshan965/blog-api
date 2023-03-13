import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { UserJwtPayloadDto } from '../user/dto/user-jwt-payload.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) public readonly postRepository: Repository<Post>,
  ) {}

  /**
   * @param createPostInput
   * @param user
   */
  async create(createPostInput: CreatePostInput, user: User) {
    const post = new Post();
    post.title = createPostInput.title;
    post.description = createPostInput.description;
    post.published = createPostInput.published;
    post.author = user;

    return await post.save();
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
