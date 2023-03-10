import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtGuard implements CanActivate {
  /**
   * @param configService
   */
  constructor(private configService: ConfigService) {}

  /**
   * @param context
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const authorizationHeader = ctx.req.headers.authorization;
    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
      try {
        ctx.user = jwt.verify(token, this.configService.get('jwt_secret_key'));
        return true;
      } catch (error) {
        throw new HttpException('token expired', HttpStatus.UNAUTHORIZED);
      }
    }
  }
}
