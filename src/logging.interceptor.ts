import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ConsoleLogger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: ConsoleLogger) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextHttp = context.switchToHttp();

    const timeBeforeRequest = Date.now();

    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(
            `Path ${contextHttp.getRequest().url} - Duration: ${Date.now() - timeBeforeRequest}ms - Status: ${contextHttp.getResponse().statusCode}}`,
          ),
        ),
      );
  }
}
