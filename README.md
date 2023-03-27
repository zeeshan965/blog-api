<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Blog application built on [Nest](https://github.com/nestjs/nest) framework TypeScript, GraphQL, Postgres Database.

## Installation

```bash
$ npm install
- copy .env.example file and create .env file
- configure DB credentials
- configure JWT
- Import the postman collections from root directory, Currently GQL and Rest endpoints are included in the postman collection.
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

```bash
# Config files for manual migration and auto migration using synchronize:true/false
import configuration from './config/configuration-am';
import configuration from './config/configuration-mm';
```

## Ways to configure typeorm
Inside app.module.ts file we can use any of these ways to configure TypeOrm
1.
```javascript
import { ConfigModule, ConfigService } from '@nestjs/config';

TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (config: ConfigService) => config.get('database'),
  inject: [ConfigService],
})
```
2.
```javascript
import { DatabaseConfig } from "./database.config";

TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useClass: DatabaseConfig,
})
```
**Note:** With the above two methods database tables will not get created.
3.
```javascript
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'blog-api',
  autoLoadEntities: true,
  synchronize: true,
})
```
4. Latest approach of TypeOrm
```javascript
import { dataSourceOptions } from './dataSource';

TypeOrmModule.forRoot(dataSourceOptions)
```

## Validation
2 ways to perform form validations

```bash
1. Globally include in main.ts file

import { ValidationPipe } from '@nestjs/common';

app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
  }),
);

2. To inlcude indiviudally on the request
**@Body(SETTINGS.VALIDATION_PIPE**
async register(@Body(SETTINGS.VALIDATION_PIPE) data: UserRegisterReqDto): Promise<UserRegisterResponseDto> {}  
```

## Exclude properties from the JSON object
To avoid accidentally leak private columns like password to front end 
we have 3 ways to do this!

```bash
1. Through find query explicitly skip those columns
await this.userRepository.findOne({
  where: { id: id },
  select: [
    'firstName',
    'lastName',
    'email',
    'role',
    'isActive',
    'createdAt',
  ],
});

2. Through interceptors using Exclude from entity
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    return call$.pipe(map(data => classToPlain(data)));
  }
}

3. Override toJsoN method inside entity
toJSON() {
  return instanceToPlain(this);
}
 
```

## DTO's
DTO classes are being in nest to entertain request data and response data
```bash
input type decorator for request data
@InputType()

object type decorator is being used for responses
@ObjectType()

field decorator is used to define input field infomation, name, validation, nullable etc. 
@Field()
```
## Guards
I've made 3 guards for the purpose of authenticate the requests before proceeding to resolver.
```bash
will check if user is passing the right login credentials
AuthGuard

will check if user is logged in and token is valid
JWTGuard

will check if user is authorized to access the route
RoleGuard
```
## Passport(local strategy)
https://www.passportjs.org/packages/
```bash
npm install --save @nestjs/passport passport passport-local
npm install --save-dev @types/passport-local

//Authenticate a user by verifying their "credentials" (such as username/password)

nest g module auth
nest g service auth
nest g module users
nest g service users
```

```typescript
//users/users.service.ts

import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    { userId: 1, username: 'john', password: 'changeme' },
    { userId: 2, username: 'maria', password: 'guess' }
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
```
```typescript
//users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```
```typescript
//auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
```

```typescript
//auth/auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}

```
```typescript
//auth/local.strategy.ts

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
```

## Passport(jwt strategy)
```typescript
//inside auth module imports array include below
imports: [
  PassportModule,
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
      secret: config.get('jwt_secret_key'),
      signOptions: {
        expiresIn: config.get('jwt_expiry'),
      },
    }),
  })
]

import { JwtService } from '@nestjs/jwt';
this.jwtService.sign(payload);

```

## JWT using jsonwebtoken
```typescript
import * as jwt from 'jsonwebtoken';

//to create new token
//payload will be some user data 
const payload = {name:'test', email: 'test@test.com'};

jwt_secret_key should be generated key pair using any of the available hashing algo, I choosed 'hs256'
const token = jwt.sign(payload, 'jwt_secret_key', {
  expiresIn: '1d',
});

//to verify token
jwt.verify(token, 'jwt_secret_key');
```

## Compression
(Helps minimize request body size) 

**Note:** For high-traffic websites in production, it is strongly recommended to offload compression from the application server - typically in a reverse proxy (e.g., Nginx). In that case, you should not use compression middleware.

```bash
npm i --save compression
```
```typescript
//inside main.ts file
import * as compression from 'compression';

app.use(compression());

```

## Throttling
```bash
npm i --save @nestjs/throttler
```
```typescript
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

ThrottlerModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    ttl: config.get('THROTTLE_TTL'),
    limit: config.get('THROTTLE_LIMIT'),
  }),
})
providers: [
  {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  },
]
//For graphql create new guard
@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  getRequestResponse(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context);
    const ctx = gqlCtx.getContext();
    return { req: ctx.req, res: ctx.res };
  }
}
providers: [
  {
    provide: APP_GUARD,
    useClass: GqlThrottlerGuard,
  },
]
// To make throttling work for both rest and gql I used GqlThrottlerGuard guard for both of them.
```
## Circular Dependency
https://docs.nestjs.com/fundamentals/circular-dependency
```typescript
  //inside auth module
  forwardRef(() => UserModule), 
  //inside user module
  forwardRef(() => AuthModule)
```

## Custom Decorators
https://docs.nestjs.com/custom-decorators
```typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
//to call above decorator
@CurrentUser() user

//Another way of doing it
//https://docs.nestjs.com/fundamentals/execution-context#reflection-and-metadata
import { SetMetadata } from '@nestjs/common';
export const Roles = (...roles: any) => SetMetadata('role', roles);
// Use it like this in controller, service, resolver etc.
@Roles('role', [])
const roles = this.reflector.get<string[]>('roles', context.getHandler());

```

## TypeOrm
TypeORM is an ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript (ES5, ES6, ES7, ES8). 
Its goal is to always support the latest JavaScript features and provide additional features that help you to develop any kind of application that uses databases - from small applications with a few tables to large scale enterprise applications with multiple databases.

### Insertion
```typescript
//this way typeorm will trigger Subscriber events not the hooks mentioned in the entity file.
// And this will return Promise<InsertResult> which holds the inserted data in raw format.
// But not applicable in my case as I'm sending post entity in return to my resolver file.
return this.postRepository.insert({ ...createPostInput, author: user });

//this way typeorm will trigger Subscriber events & hooks mentioned in the entity file because we're calling save() method
//create() will create the DeepPartial of our entity so we can save it using save method.
const post = this.postRepository.create({ ...createPostInput, author: user });
return post.save();

//The most clean and object oriented way, controls in your hand. It will call hooks wherever they are written since we're calling save()
const post = new Post();
post.title = createPostInput.title;
post.description = createPostInput.description;
post.published = createPostInput.published;
post.author = user;
post.save();
```

### Updates
```typescript
//this way it will call Subscriber events not the hooks mentioned in entity file
// Only make 1 update query to DB. Most efficeint way but it will not return post object
const { id, slug, ...updates } = updatePostInput;
return await this.postRepository.update({ slug: slug }, { ...updates });

// This way it will call Subscriber events not the hooks mentioned in entity file
// It will make 2 DB calls one for getting data second for updating data.
// But this update will work only with ID if ID exists it will update otherwise will keep inserting new record.
const { id, slug, ...updates } = updatePostInput;
return this.postRepository.save({ id: id, author: user, ...updates });

//Another way of doing it, But this will do 3 DB calls two for Select and one for the update. But it will trigger entity hooks.
// Not a good approach since it increasing DB calls for one operation.
const foundEntity = await this.postRepository.findOne({
  where: { slug: slug },
});
return await this.postRepository.save(Object.assign(foundEntity, updates));

//Alternate way of 2nd solution 
const foundEntity = await this.postRepository.findOne({
  where: { slug: slug },
});
Object.entries(result).forEach(([key, value]) => {
  foundEntity[key] = value;
});
return await this.postRepository.save(foundEntity);
```

### Fetch Data
```typescript
//Not sure why but its giving me data in plainObject that exclude the keys which are not meant to be sent to client e.g, password.
return this.postRepository.find({
  relations: { author: true },
});

// For single record
return this.postRepository.findOneOrFail({ where: { id: id } });
```

### Remove Data
```typescript
//remove data from DB, It will return Promise<DeleteResult> and it will tell us if the delete is success or not. 
this.postRepository.delete(id);

//Alternate ways
this.postRepository.remove();
this.postRepository.softRemove();
this.postRepository.softDelete();
```

### Relations
It's pretty much similar to Eloquent (Laravel) & Doctrine ORM (Symfony). Syntax and naming conventions are very much similar.
You can define relations inside entity classes.
Available relations:
```bash
@OneToMany A.K.A hasMany()
@ManyToOne A.K.A belongsTo()
@ManyToMany A.K.A hasMany() & belongsToMany()

//Self relations A.K.A Self Joins:
@ManyToOne(() => Comment, { nullable: true })
parent: Comment;

@OneToMany(() => Comment, (comment) => comment.parent)
replies: Comment[];
```
```typescript
// Some examples to use self relations
//comment.entity.ts
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@ManyToOne(() => Comment, { nullable: true })
parent: Comment;

@OneToMany(() => Comment, (comment) => comment.parent)
replies: Comment[];

//comment.service.ts
this.commentRepository.find({
  where: { parent: { id: IsNull() } },
  relations: { replies: { replies: { replies: true } } },
  order: { id: 'ASC' },
});

//comment.resolver.ts
import { ResolveField, Parent } from '@nestjs/graphql';

@ResolveField(() => [Comment])
async reply(@Parent() comment: Comment): Promise<Comment[]> {
  return this.commentRepository.find({
    where: { parent: Equal(comment?.id) },
    order: { createdAt: 'DESC' },
  });
}
```

**Note:** Circular eager relations are disallowed. If both parent and child has eager true then we need to remove it from one side of the relation. 
e.g, Comment#post contains "eager: true", and its inverse side Post#comments contains "eager: true" as well. Remove "eager: true" from one side of the relation.

```typescript
// Country - capital city: Each country has exactly one capital city. Each capital city is the capital of exactly one country.
@OneToOne(() => Capital, (capital) => capital.city, {}) //{} for options
capital?: Capital;

// In this example, A single author can do multiple posts
@OneToMany(() => Post, (post) => post.author)
posts?: Post[];

// In this example a post belongs to a single author
@ManyToOne(() => User, (user) => user.posts)
author?: User;

// Many-to-many is a relation where A contains multiple instances of B, and B contains multiple instances of A. 
// Let's take for example Post and Category entities. 
// A post can have multiple categories, and each category can have multiple posts.
@ManyToMany(() => Post, (post) => post.categories)
posts: Post[]

@ManyToMany(() => Category, (category) => category.posts)
@JoinTable()
categories: Category[]
```
**Note:** To be able to trigger typeorm hooks only use save() method as per their documentation otherwise hooks will not trigger.
```typescript
//Alternate ways to create new post, But hooks will only work with save() method.
this.postRepository.insert({ ...createPostInput, author: user }); //will not trigger hooks

//will trigger hooks
const post = this.postRepository.create({ ...createPostInput, author: user });
post.save();

//Another way of doing it.
const entity = new Post();
entity.title = createPostInput.title;
entity.description = createPostInput.description;
entity.published = createPostInput.published;
entity.author = user;
entity.save();
```

### Hooks/Listeners
Any of your entities can have methods with custom logic that listen to specific entity events. You must mark those methods with special decorators depending on what event you want to listen to.
**Note:** Do not make any database calls within a listener, opt for subscribers instead.

```typescript
// Entity base hooks, Meaning you can define the below hooks inside your entites like this:
/*@BeforeUpdate()
async someFunction() {
  console.log('inside before update');
}*/

import {
  AfterInsert,
  AfterLoad,
  AfterRecover,
  AfterRemove,
  AfterSoftRemove,
  AfterUpdate,
  BeforeInsert, BeforeRecover, BeforeRemove,
  BeforeUpdate
} from "typeorm";

@AfterLoad()
@AfterInsert()
@AfterUpdate()
@AfterRemove()
@AfterRecover()
@AfterSoftRemove()
@BeforeInsert()
@BeforeUpdate()
@BeforeRecover()
@BeforeRemove()
@BeforeSoftRemove()

```

### Subscribers
We can define global subscriber as well as module base subscriber

```typescript
  //Global Subscriber
  @EventSubscriber()
  export class AppGlobalSubscriber implements EntitySubscriberInterface {
      afterLoad(entity: any) { console.log(`AFTER ENTITY LOADED: `, entity); }
      beforeInsert(event: InsertEvent<any>) { console.log(`BEFORE ENTITY INSERTED: `); }
      afterInsert(event: InsertEvent<any>) { console.log(`AFTER ENTITY INSERTED: `); }
      beforeUpdate(event: UpdateEvent<any>) { console.log(`BEFORE ENTITY UPDATED: `); }
      afterUpdate(event: UpdateEvent<any>) { console.log(`AFTER ENTITY UPDATED: `); }
      beforeRemove(event: RemoveEvent<any>) { console.log(`BEFORE ENTITY WITH ID ${event.entityId} REMOVED: `, event.entity); }
      afterRemove(event: RemoveEvent<any>) { console.log(`AFTER ENTITY WITH ID ${event.entityId} REMOVED: `, event.entity); }
      beforeSoftRemove(event: SoftRemoveEvent<any>) { console.log(`BEFORE ENTITY WITH ID ${event.entityId} SOFT REMOVED: `, event.entity); }
      afterSoftRemove(event: SoftRemoveEvent<any>) { console.log(`AFTER ENTITY WITH ID ${event.entityId} SOFT REMOVED: `, event.entity); }
      beforeRecover(event: RecoverEvent<any>) { console.log(`BEFORE ENTITY WITH ID ${event.entityId} RECOVERED: `, event.entity); }
      afterRecover(event: RecoverEvent<any>) { console.log(`AFTER ENTITY WITH ID ${event.entityId} RECOVERED: `, event.entity); }
      beforeTransactionStart(event: TransactionStartEvent) { console.log(`BEFORE TRANSACTION STARTED: `); }
      afterTransactionStart(event: TransactionStartEvent) { console.log(`AFTER TRANSACTION STARTED: `); }
      beforeTransactionCommit(event: TransactionCommitEvent) { console.log(`BEFORE TRANSACTION COMMITTED: `); }
      afterTransactionCommit(event: TransactionCommitEvent) { console.log(`AFTER TRANSACTION COMMITTED: `); }
      beforeTransactionRollback(event: TransactionRollbackEvent) { console.log(`BEFORE TRANSACTION ROLLBACK: `); }
      afterTransactionRollback(event: TransactionRollbackEvent) { console.log(`AFTER TRANSACTION ROLLBACK: `); }
  }

    //Module Subscriber
  export class PostSubscriber implements EntitySubscriberInterface<Post> {
    listenTo() {
      return Post;
    }
    
    beforeUpdate(event: UpdateEvent<Post>) {
      console.log(`BEFORE POST UPDATE: `);
    }
  }
```

## File Upload using GraphQL 
```bash
//pre-requisite graphql & apollo
npm install graphql-scalars graphql-upload-minimal
```
First modify tsconfig.json and add the below.
```typescript
"target": "es2022",
"moduleResolution": "node",
"module": "NodeNext",
```
Include graphqlUploadExpress middleware in PostModule
```typescript
//Inside post module
import { graphqlUploadExpress } from 'graphql-upload-minimal';

export class PostModule {
  configure(consumer) {
    consumer.apply(graphqlUploadExpress({ maxFiles: 10 })).forRoutes('graphql');
  }
}
```
The graphqlUploadExpress will send the request to processRequest.js and it will process the request and attach file data to request body. Then UploadScalar receives the file data and resolver function will read and write the file to upload folder.
```js
/node_modules/graphql-upload-minimal/public
```

### Post Resolver

```typescript
import { UploadScalar } from '../utils/graphql-upload';
import { createWriteStream } from 'fs';

@Mutation(() => Boolean)
async uploadFile(
  @Args({ name: 'file', type: () => UploadScalar })
file: FileUpload,
): Promise<boolean> {
  const { createReadStream, filename } = await file;
  const extension = filename.split('.')[1];
  const path = `./uploads/${Date.now() / 1000}.${extension}`;
  return new Promise((resolve, reject) =>
    createReadStream()
      .pipe(createWriteStream(path))
      .on('finish', () => resolve(true))
      .on('error', () => reject(false)),
  );
}
```

### Custom Scalar

```typescript
import { GraphQLScalarType } from 'graphql';
import { Upload } from 'graphql-upload-minimal';

export const UploadScalar = new GraphQLScalarType({
  name: 'Upload',
  description: 'The `Upload` scalar type represents a file upload.',
  parseValue: (value: Upload) => {
    return value.file;
  },
  parseLiteral: (ast) => {
    throw new Error('Upload literal unsupported.');
  },
  serialize: (value) => {
    throw new Error('Upload serialization unsupported.');
  },
});

```