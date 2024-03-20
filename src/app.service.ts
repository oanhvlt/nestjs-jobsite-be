import { Injectable } from '@nestjs/common';

@Injectable() //provider
export class AppService {
  getHello(): string {
    //model: code
    return 'Hello World! 123 455';
  }
}
