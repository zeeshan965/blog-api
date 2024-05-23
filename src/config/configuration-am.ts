export default () => ({
  env: process.env.PORT || 'prod',
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt_secret_key: process.env.JWT_SECRET_KEY || 'xxx-jwt-xxxx-secret-xxx-key',
  jwt_expiry: process.env.JWT_EXPIRY || '1d',
  throttle_tl: process.env.THROTTLE_TTL || 60,
  throttle_limit: process.env.THROTTLE_LIMIT || 10,
  elastic_search: process.env.ELASTIC_SEARCH || '',
  elastic_search_index: process.env.ELASTIC_SEARCH_INDEX || '',
  cloudinary_name: process.env.CLOUDINARY_NAME || '',
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY || '',
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET || '',
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
  slack_bot_token: process.env.SLACK_BOT_TOKEN || 'xxx-jwt-xxxx-secret-xxx-key',
});
