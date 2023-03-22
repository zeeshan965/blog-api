import { Field, ObjectType } from '@nestjs/graphql';
import { ResponseDto } from '../../../utils/response.dto';
import { Category } from '../entities/category.entity';

@ObjectType()
export class CategoryResponseDto extends ResponseDto {
  @Field(() => Category, { nullable: true })
  category?: Category;

  @Field(() => [Category], { nullable: true })
  categories?: Category[];
}
