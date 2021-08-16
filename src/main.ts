require('dotenv').config({ path: '.env' });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupDocumentation } from './swagger';
import { config } from './config';
import {Logger} from '@nestjs/common';

const logger: Logger = new Logger('Main');
const port = process.env.PORT || config.get('server.port');

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  setupDocumentation(app);

  await app.listen(port);
  logger.log(`Application running on port ${port}`);
}
bootstrap();
