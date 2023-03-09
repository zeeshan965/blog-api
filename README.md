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


