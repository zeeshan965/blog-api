import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../../../utils/abstract-entity';
import { Post } from '../../entities/post.entity';

@Entity('categories')
export class Category extends AbstractEntity {
  @Column({ unique: true })
  title: string;

  @ManyToMany(() => Post, (post) => post.categories)
  posts: Post[];
}
