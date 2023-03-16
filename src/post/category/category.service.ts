import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  /**
   * @param categoryRepository
   */
  constructor(
    @InjectRepository(Category)
    public readonly categoryRepository: Repository<Category>,
  ) {}

  /**
   * @param createCategoryInput
   */
  create(createCategoryInput: CreateCategoryInput) {
    const category = this.categoryRepository.create({
      ...createCategoryInput,
    });
    return category.save();
  }

  /**
   * @param updateCategoryInput
   */
  async update(updateCategoryInput: UpdateCategoryInput) {
    try {
      const { id, ...updates } = updateCategoryInput;
      const category = await this.categoryRepository.findOneOrFail({
        where: { id: id },
        relations: { posts: true },
      });
      return this.categoryRepository.save(Object.assign(category, updates));
    } catch (error) {
      return {
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        category: new Category(),
      };
    }
  }

  /**
   * @param id
   */
  remove(id: number) {
    return this.categoryRepository.delete(id);
  }

  /**
   *
   */
  findAll() {
    return this.categoryRepository.find({
      relations: { posts: true },
    });
  }

  /**
   * @param id
   */
  findOne(id: number) {
    return this.categoryRepository.findOneOrFail({
      where: { id: id },
      relations: {
        posts: true,
      },
    });
  }
}
