import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @IsNotEmpty()
  @Field(() => String)
  title: string;

  @IsNotEmpty()
  @Field(() => String)
  description: string;
}
