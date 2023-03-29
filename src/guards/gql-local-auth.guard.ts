import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContext, Injectable } from '@nestjs/common';

/**
 * This guard will transform GQL request to normal request so that passport local strategy can work with GraphQL
 */
@Injectable()
export class GqlLocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  /**
   * @param context
   */
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext();
    request.body = ctx.getArgs();
    return request;
  }
}
