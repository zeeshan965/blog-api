import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { Exclude, instanceToPlain } from 'class-transformer';

@Entity('users')
@ObjectType()
export class User extends BaseEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

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

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
