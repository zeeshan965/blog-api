import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  JoinTable,
  BeforeInsert,
} from 'typeorm';
import { AbstractEntity } from '../../utils/abstract-entity';
import { User } from '../../user/entity/user.entity';
import { Comment } from '../comment/entities/comment.entity';
import { Category } from '../category/entities/category.entity';
import * as slugify from 'slug';

export enum PostMedia {
  IMAGE = 'image',
  VIDEO = 'video',
}

@Entity('posts')
@ObjectType()
export class Post extends AbstractEntity {
  @Column({ name: 'title', length: 255, nullable: true })
  @Field(() => String)
  title: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  @Field(() => String)
  description: string;

  @Column({ name: 'published', type: 'int', default: 0 })
  @Field(() => String)
  published: boolean;

  @Column({ name: 'published_at', type: 'timestamp', nullable: true })
  @Field(() => Date)
  publishedAt?: Date;

  @Column({ name: 'slug', length: 50, nullable: true })
  @Field(() => String)
  slug: string;

  @Column({ name: 'trashed', type: 'timestamp', nullable: true })
  @Field(() => String)
  trashed: string;

  @Column({ name: 'post_media', length: 255, nullable: true })
  @Field(() => String)
  postMedia: string;

  @Column({
    name: 'post_media_type',
    type: 'enum',
    enum: PostMedia,
    default: PostMedia.IMAGE,
  })
  @Field(() => String)
  postMediaType: string;

  @ManyToOne(() => User, (user) => user.posts)
  author?: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments?: Comment[];

  @ManyToMany(() => Category, (category) => category.posts)
  @JoinTable({ name: 'post_categories' })
  categories: Category[];

  @BeforeInsert()
  generateSlug() {
    this.slug =
      slugify(this.title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
  }

  @BeforeInsert()
  setPublishedAt() {
    this.publishedAt = this.published ? new Date() : null;
  }
}
