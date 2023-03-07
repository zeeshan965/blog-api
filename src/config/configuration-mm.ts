export default () => ({
  env: process.env.PORT || 'prod',
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'blog-api',
    migrations: ['dist/migrations/*{.ts,.js}'],
    entities: ['dist/**/*.entity{.ts,.js}'],
    cli: {
      migrationsDir: 'src/migrations',
    },
    synchronize: false,
  },
});
