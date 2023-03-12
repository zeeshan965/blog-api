import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../utils/abstract-entity';
import { Post } from '../../entities/post.entity';
import { User } from '../../../user/entity/user.entity';

@Entity('comments')
@ObjectType()
export class Comment extends AbstractEntity {
  @Column({ name: 'message', type: 'text', nullable: true })
  @Field(() => String)
  message: string;

  @ManyToOne(() => User, (user) => user.comments)
  author?: User;

  @Column({ default: 0 })
  likes?: number;

  @Column({ default: 0 })
  dislikes?: number;

  @ManyToOne(() => Post, (post) => post.comments)
  post?: Post;
}
