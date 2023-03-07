import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('app_users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  email: string;

  @Column()
  unique_id: string;

  @Column()
  password: string;

  @Column()
  role: string;
}
