import { Logger, INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {config} from './config';

export function setupDocumentation(app: INestApplication): any {

    const logger: Logger = new Logger('Swagger');
    const swaggerEndpoint = '/api/v1/api-docs';

    const options = new DocumentBuilder()
        .setTitle(config.get('swagger.title'))
        .setDescription(config.get('swagger.description'))
        .setVersion(config.get('swagger.version'))
        .build()

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(swaggerEndpoint, app, document);
    logger.log(`Swagger is running on endpoint ${swaggerEndpoint}`);
}
