import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  ConsoleLogger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: ConsoleLogger) { }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusCode = exception.getStatus();
    const fullResponse = {
      fullResponse: exception.getResponse(),
      statusCode,
    };

    this.logger.error(
      `Error in path ${request.url} - Details: ${JSON.stringify(fullResponse)}`,
    );

    response.status(statusCode).json(fullResponse);
  }
}
