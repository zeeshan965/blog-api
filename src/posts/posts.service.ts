import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entity/user.entity';
import { In, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { Category } from './categories/entities/category.entity';
import { createWriteStream } from 'fs';
import { CloudinaryService } from './cloudinary.service';
import { FileUpload } from 'graphql-upload-minimal';
import { generateRandomString } from '../utils/app.utils';

@Injectable()
export class PostsService {
  /**
   * @param postRepository
   * @param categoryRepository
   * @param cloudinaryService
   */
  constructor(
    @InjectRepository(Post) public readonly postRepository: Repository<Post>,
    @InjectRepository(Category)
    public readonly categoryRepository: Repository<Category>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  /**
   * @param createPostInput
   * @param user
   */
  async create(createPostInput: CreatePostInput, user: User): Promise<Post> {
    /** TODO: Alternate ways to create new post, But hooks will only work with save() method.
     * return this.postRepository.insert({ ...createPostInput, author: user });
     * const post = this.postRepository.create({ ...createPostInput, author: user }); */
    const { categories, mediaFile, ...data } = createPostInput;
    const post = this.postRepository.create({
      ...data,
      author: user,
    });
    if (categories && categories.length > 0) {
      post.categories = await this.categoryRepository.find({
        where: { id: In(categories) },
      });
    }
    if (mediaFile) {
      //post.postMedia = await this.uploadFile(await mediaFile);
      post.postMedia = await this.cloudinaryService.uploadStream(
        await mediaFile,
      );
      console.log(post.postMedia);
    }
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
   * @param search
   */
  async findAll(search?: string): Promise<Post[]> {
    /*const posts = await this.postRepository.find({
      where: {
        title: ILike('%direct%'),
      },
    });
    console.log(posts);
    return posts;*/
    const posts = await this.postRepository
      .createQueryBuilder('p')
      .innerJoinAndSelect('p.author', 'u');
    if (search && search != '') {
      posts
        .where('lower(p.title) like :s', { s: '%' + search + '%' })
        .orWhere('lower(p.description) like :s', { s: '%' + search + '%' })
        .orWhere('lower(u.first_name) like :s', { s: '%' + search + '%' })
        .orWhere('lower(u.last_name) like :s', { s: '%' + search + '%' })
        .orWhere('lower(u.email) like :s', { s: '%' + search + '%' });
    }
    return posts.getMany();
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

  /**
   * @param page
   * @param limit
   */
  async paginate(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return await this.postRepository
      .createQueryBuilder('p')
      .innerJoinAndSelect('p.author', 'u')
      .offset(skip)
      .limit(limit)
      .orderBy('p.created_at', 'ASC')
      .getMany();
  }

  /**
   * @param file
   * @private
   */
  uploadFile(file: FileUpload): Promise<string> {
    const { createReadStream, filename } = file;
    const extension = filename.split('.')[1];
    const name = `${generateRandomString(10)}_${Date.now()}.${extension}`;
    const path = process.cwd() + '/public/uploads/' + name;

    return new Promise((resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(path))
        .on('finish', () => resolve(name))
        .on('error', () => reject('')),
    );
  }
}
