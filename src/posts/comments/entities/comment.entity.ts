import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../utils/abstract-entity';
import { Post } from '../../entities/post.entity';
import { User } from '../../../users/entity/user.entity';
import { UserJwtPayloadDto } from '../../../users/dto/user-jwt-payload.dto';

@Entity('comments')
@ObjectType()
export class Comment extends AbstractEntity {
  @Column({ name: 'message', type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  message: string;

  @Field(() => UserJwtPayloadDto, { nullable: true })
  @ManyToOne(() => User, (user) => user.comments)
  author?: User;

  @Column({ default: 0 })
  @Field(() => Int, { nullable: true })
  likes?: number;

  @Column({ default: 0 })
  @Field(() => Int, { nullable: true })
  dislikes?: number;

  @Field(() => Post, { nullable: true })
  @ManyToOne(() => Post, (post) => post.comments)
  post?: Post;

  @Field(() => Comment, { nullable: true })
  @ManyToOne(() => Comment, (comment) => comment.replies, { nullable: true })
  parent: Comment;

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.parent)
  replies: Comment[];
}
