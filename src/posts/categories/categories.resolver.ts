import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { CategoryResponseDto } from './dto/category-response.dto';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '../../guards/gql-jwt-auth.guard';
import { Post } from '../entities/post.entity';

@Resolver(() => Category)
@UseGuards(GqlJwtAuthGuard)
export class CategoriesResolver {
  /**
   * @param categoryService
   */
  constructor(private readonly categoryService: CategoriesService) {}

  /**
   * @param createCategoryInput
   */
  @Mutation(() => CategoryResponseDto)
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    const category = await this.categoryService.create(createCategoryInput);
    return { message: 'success!', status: 200, category: category };
  }

  /**
   * @param updateCategoryInput
   */
  @Mutation(() => CategoryResponseDto)
  async updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    const category = await this.categoryService.update(updateCategoryInput);
    if (!(category instanceof Category)) return { ...category };

    return { message: 'success!', status: 200, category: category };
  }

  /**
   * @param id
   */
  @Mutation(() => CategoryResponseDto)
  async removeCategory(@Args('id', { type: () => Int }) id: number) {
    const category = await this.categoryService.remove(id);
    return { message: 'success!', status: 200, deleted: category.affected };
  }

  /**
   *
   */
  @Query(() => CategoryResponseDto)
  async findAllCategories() {
    const categories: Category[] = await this.categoryService.findAll();
    return { message: 'success!', status: 200, categories: categories };
  }

  /**
   * @param id
   */
  @Query(() => CategoryResponseDto)
  async findOneCategory(@Args('id', { type: () => Int }) id: number) {
    const category: Category = await this.categoryService.findOne(id);
    return { message: 'success!', status: 200, category: category };
  }

  /**
   *
   */
  @Query(() => [Post], { name: 'post' })
  searchCategories() {
    return this.categoryService.findAll();
  }
}
