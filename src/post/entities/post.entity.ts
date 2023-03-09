import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
@ObjectType()
export class Post {
  @Exclude()
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ name: 'title', length: 255, nullable: true })
  @Field(() => String)
  title: string;

  @Column({ name: 'description', nullable: true })
  @Field(() => String)
  description: string;
}
