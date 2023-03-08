export default () => ({
  env: process.env.PORT || 'prod',
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt_secret_key: process.env.JWT_SECRET_KEY || 'xxx-jwt-xxxx-secret-xxx-key',
  jwt_expiry: process.env.JWT_EXPIRY || '1d',
  database: {
    type: process.env.DB_DRIVER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB || '',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: process.env.DB_SYNC === 'true',
    logging: process.env.DB_LOGGING === 'true',
  },
});
