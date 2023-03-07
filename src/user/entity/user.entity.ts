import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bi_users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;
}
