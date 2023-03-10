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

```
