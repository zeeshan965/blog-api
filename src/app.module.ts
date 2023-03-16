import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Configuration from './config/configuration-am';
//import Configuration from './config/configuration-mm';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration-am';
//import configuration from './config/configuration-mm';
import * as dotenv from 'dotenv';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { dataSourceOptions } from './dataSource';
import { UserModule } from './user/user.module';
import { AuthModule } from './user/auth/auth.module';
import { PostModule } from './post/post.module';
import { CommentsModule } from './post/comment/comments.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { GqlThrottlerGuard } from './guard/gql.throttler.guard';
import { CategoryModule } from './post/category/category.module';
dotenv.config();

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('throttle_tl'),
        limit: config.get('throttle_limit'),
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Configuration],
      envFilePath: configuration().env === 'prod' ? 'prod.env' : '.env',
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    AuthModule,
    CategoryModule,
    PostModule,
    CommentsModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: GqlThrottlerGuard }, AppResolver],
})
export class AppModule {}
