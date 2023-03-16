import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../utils/abstract-entity';
import { Post } from '../../entities/post.entity';
import { User } from '../../../user/entity/user.entity';
import { UserJwtPayloadDto } from '../../../user/dto/user-jwt-payload.dto';

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

  @ManyToOne(() => Post, (post) => post.comments)
  post?: Post;

  @ManyToOne(() => Comment,(parent) => parent.id, { nullable: true })
  @Field(() => Comment, { nullable: true })
  parent: Comment;
}
