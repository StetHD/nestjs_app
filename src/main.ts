import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupDocumentation } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupDocumentation(app);
  await app.listen(3000);
}
bootstrap();
