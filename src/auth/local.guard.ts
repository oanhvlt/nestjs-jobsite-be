import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
//local: this is key word of Guard
export class LocalAuthGuard extends AuthGuard('local') { }