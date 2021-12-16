import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    switch (exception.code) {
      case 11000:
        response.status(409).json({
          message:
            '사용할 수 없는 이름 혹은 이메일 입니다. 다른 값을 사용하세요.',
        });
        break;
      default:
        response.status(500).json({
          message: exception.message,
        });
        break;
    }
  }
}
