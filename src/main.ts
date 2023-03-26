import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './config/configuration-am';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
//import configuration from './config/configuration-mm';
import compression from 'compression';

async function bootstrap() {
  const port = configuration().port;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.use(compression());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app
    .listen(port)
    .then(() => console.log(`App is running on port ${port}`))
    .catch((error: Error) => console.log(error));
}

bootstrap().then((r) => r);
