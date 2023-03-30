import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './config/configuration-am';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
//import configuration from './config/configuration-mm';
import compression from 'compression';
import * as express from 'express';

async function bootstrap() {
  const port = configuration().port;
  const app = await NestFactory.create(AppModule, { cors: true });

  //To run the validation globally
  app.useGlobalPipes(new ValidationPipe());

  //Compression can greatly decrease the size of the response body, thereby increasing the speed of a web app.
  app.use(compression());

  //Use this for the purpose of data sanitization to exclude properties from the response
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.use(express.static('public'));

  await app
    .listen(port)
    .then(() => console.log(`App is running on port ${port}`))
    .catch((error: Error) => console.log(error));
}

bootstrap().then((r) => r);
