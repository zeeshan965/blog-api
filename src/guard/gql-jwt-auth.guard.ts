import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContext, Injectable } from '@nestjs/common';

/**
 * This guard will transform GQL request to normal request so that passport jwt strategy can work with GraphQL
 */
@Injectable()
export class GqlJwtAuthGuard extends AuthGuard('jwt') {
  /**
   * @param context
   */
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
