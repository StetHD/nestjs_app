require('dotenv').config({ path: '.env' });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupDocumentation } from './swagger';
import { config } from './config';
import {BadRequestException, Logger, ValidationPipe} from '@nestjs/common';

const logger: Logger = new Logger('Main');
const port = process.env.PORT || config.get('server.port');

async function bootstrap(): Promise<void> {

  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);

  app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: (): BadRequestException => new BadRequestException('Validation error'),
      }),
  );

  setupDocumentation(app);

  await app.listen(port);
  logger.log(`Application running on port ${port}`);
}

bootstrap();
