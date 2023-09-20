import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(res): string {
    return res.send('OK');
  }
}
