import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './config/configuration';

async function bootstrap() {
  const port = configuration().port;
  const app = await NestFactory.create(AppModule, { cors: true });
  await app
    .listen(port)
    .then(() => console.log(`App is running on port ${port}`))
    .catch((error: Error) => console.log(error));
}

bootstrap().then((r) => r);
