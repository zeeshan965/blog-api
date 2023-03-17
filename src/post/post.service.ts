import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { In, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { Category } from './category/entities/category.entity';

@Injectable()
export class PostService {
  /**
   * @param postRepository
   * @param categoryRepository
   */
  constructor(
    @InjectRepository(Post) public readonly postRepository: Repository<Post>,
    @InjectRepository(Category)
    public readonly categoryRepository: Repository<Category>,
  ) {}

  /**
   * @param createPostInput
   * @param user
   */
  create(createPostInput: CreatePostInput, user: User): Promise<Post> {
    /** TODO: Alternate ways to create new post, But hooks will only work with save() method.
     * return this.postRepository.insert({ ...createPostInput, author: user });
     * const post = this.postRepository.create({ ...createPostInput, author: user }); */
    const post = this.postRepository.create({
      ...createPostInput,
      author: user,
    });

    // const post = new Post();
    // post.title = createPostInput.title;
    // post.description = createPostInput.description;
    // post.published = createPostInput.published;
    // post.author = user;
    // post.save();

    return post.save();
  }

  /**
   * @param updatePostInput
   */
  async update(updatePostInput: UpdatePostInput): Promise<Post> {
    const { id, slug, ...updates } = updatePostInput;
    const post = await this.postRepository.findOneOrFail({
      where: { slug: slug },
      relations: { author: true },
    });
    if (updatePostInput.categories) {
      post.categories = await this.categoryRepository.find({
        where: {
          id: In(updatePostInput.categories),
        },
      });
    }

    return this.postRepository.save(Object.assign(post, updates));

    /*return this.postRepository.save({
      id: id,
      slug: slug,
      author: user,
      ...updates,
    });*/
  }

  /**
   * @param id
   */
  remove(id: number) {
    return this.postRepository.delete(id);
  }

  /**
   *
   */
  findAll(): Promise<Post[]> {
    return this.postRepository.find({
      relations: { author: true },
    });
  }

  /**
   * @param id
   */
  findOne(id: number) {
    return this.postRepository.findOneOrFail({
      where: { id: id },
      relations: {
        author: true,
        comments: true,
      },
    });
  }
}
