import {CallHandler, ExecutionContext, Logger, NestInterceptor} from '@nestjs/common';
import {Observable} from 'rxjs';

export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {

        const request: Request = context.switchToHttp().getRequest();
        Logger.debug(
            `${context.getClass().name}.${context.getHandler().name}() => ${request.method} ${request.url}`,
            'LoggingInterceptor');

        return next.handle();
    }
}
