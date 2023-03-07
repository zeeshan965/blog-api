import { DataSource } from 'typeorm';

export default new DataSource({
  host: 'localhost',
  port: 5432,
  type: 'postgres',
  username: 'postgres',
  password: 'root',
  database: 'blog-api',
  migrationsRun: true,
  logging: true,
  migrations: ['src/migrations/*.ts'],
  entities: ['src/**/**.entity.ts'],
});
