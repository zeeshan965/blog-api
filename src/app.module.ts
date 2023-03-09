import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
import { AttachmentModule } from './attachment/attachment.module';
import { CommentsModule } from './comments/comments.module';
dotenv.config();

@Module({
  imports: [
    UserModule,
    AuthModule,
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
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    PostModule,
    AttachmentModule,
    CommentsModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
