import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  JoinTable,
  BeforeInsert,
  BeforeUpdate,
  AfterUpdate,
} from 'typeorm';
import { AbstractEntity } from '../../utils/abstract-entity';
import { User } from '../../users/entity/user.entity';
import { Comment } from '../comments/entities/comment.entity';
import { Category } from '../categories/entities/category.entity';
import slug from 'slug';
import { Exclude, instanceToPlain } from 'class-transformer';
import { UserJwtPayloadDto } from '../../users/dto/user-jwt-payload.dto';

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

  @Column({ name: 'published', type: 'boolean', default: false })
  @Field(() => Boolean)
  published: boolean;

  @Column({ name: 'published_at', type: 'timestamp', nullable: true })
  @Field(() => Date, { nullable: true })
  publishedAt?: Date;

  @Column({ name: 'slug', length: 50, nullable: true })
  @Field(() => String, { nullable: true })
  slug: string;

  @Exclude()
  @Column({ name: 'trashed', type: 'timestamp', nullable: true })
  @Field(() => Date, { nullable: true })
  trashed?: Date;

  @Column({ name: 'post_media', length: 255, nullable: true })
  @Field(() => String, { nullable: true })
  postMedia?: string;

  @Column({ name: 'media_id', length: 255, nullable: true })
  @Field(() => String, { nullable: true })
  mediaId?: string;

  @Column({
    name: 'post_media_type',
    type: 'enum',
    enum: PostMedia,
    default: PostMedia.IMAGE,
  })
  @Field(() => String, { nullable: true })
  postMediaType: string;

  @Field(() => UserJwtPayloadDto, { nullable: true })
  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  author?: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments?: Comment[];

  @ManyToMany(() => Category, (category) => category.posts)
  @JoinTable({ name: 'post_categories' })
  categories: Category[];

  @BeforeInsert()
  generateSlug() {
    this.slug =
      slug(this.title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
  }

  @BeforeInsert()
  setPublishedAt() {
    // will not triggered from insert() method
    console.log('inside before insert');
    this.publishedAt = this.published ? new Date() : null;
  }

  @BeforeUpdate()
  async update() {
    // will not work with update() method
    console.log('inside before update');
  }

  @AfterUpdate()
  afterUpdate() {
    // will not work with update() method
    console.log('inside after update');
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
