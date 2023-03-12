import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { Exclude, instanceToPlain } from 'class-transformer';
import { AbstractEntity } from '../../utils/abstract-entity';
import { Post } from '../../post/entities/post.entity';
import { Comment } from '../../post/comment/entities/comment.entity';

@Entity('users')
@ObjectType()
export class User extends AbstractEntity {
  @Column({ name: 'first_name', length: 191, nullable: false })
  @Field(() => String)
  firstName: string;

  @Column({ name: 'last_name', length: 191, nullable: false })
  @Field(() => String)
  lastName: string;

  @Column({ name: 'email', unique: true, length: 191, nullable: false })
  @Field(() => String)
  email: string;

  @Exclude()
  @Column({ name: 'password', length: 255, nullable: false })
  @Field(() => String, { nullable: true })
  password: string;

  @Exclude()
  @Column({
    name: 'is_active',
    type: 'boolean',
    nullable: true,
    default: false,
  })
  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;

  @Column({ name: 'role', nullable: true })
  @Field(() => String)
  role?: string;

  @OneToMany(() => Post, (post) => post.author)
  posts?: Post[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments?: Comment[];

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
