import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../../../utils/abstract-entity';
import { Post } from '../../entities/post.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('categories')
@ObjectType()
export class Category extends AbstractEntity {
  @Column({ name: 'title', length: 255, nullable: true })
  @Field(() => String, { nullable: true })
  title: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  description: string;

  @ManyToMany(() => Post, (post) => post.categories, { onDelete: 'RESTRICT' })
  posts: Post[];
}
