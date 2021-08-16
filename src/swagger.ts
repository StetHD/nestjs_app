import { Logger, INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupDocumentation(app: INestApplication): any {

    const logger: Logger = new Logger('Swagger');
    const swaggerEndpoint = '/api/v1/api-docs';

    const options = new DocumentBuilder()
        .setTitle('sample')
        .setDescription('sample')
        .setVersion('sample')
        .build()

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(swaggerEndpoint, app, document);
    logger.log(`Swagger is running on endpoint ${swaggerEndpoint}`);
}
