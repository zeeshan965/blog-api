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
import { UsersModule } from './users/users.module';
import { AuthModule } from './users/auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './posts/comments/comments.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { GqlThrottlerGuard } from './guards/gql.throttler.guard';
import { CategoriesModule } from './posts/categories/categories.module';
import { HttpModule } from '@nestjs/axios';
import { MessagingModule } from './messaging/messaging.module';
import { AppController } from './app.controller';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Configuration],
      envFilePath: configuration().env === 'prod' ? 'prod.env' : '.env',
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('throttle_tl'),
        limit: config.get('throttle_limit'),
      }),
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
    UsersModule,
    AuthModule,
    CategoriesModule,
    PostsModule,
    CommentsModule,
    MessagingModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: GqlThrottlerGuard }, AppResolver],
})
export class AppModule {}
