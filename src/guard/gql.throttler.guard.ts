import { ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  /**
   * @param context
   */
  getRequestResponse(context: ExecutionContext) {
    if (typeof context.switchToHttp().getRequest() !== 'undefined') {
      const request = context.switchToHttp().getRequest();
      return { req: request, res: request };
    } else {
      const gqlCtx = GqlExecutionContext.create(context);
      const ctx = gqlCtx.getContext();
      return { req: ctx.req, res: ctx.res };
    }
  }
}
