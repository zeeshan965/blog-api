import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const Roles = {
  ADMIN: 'ADMIN',
  NORMAL_USER: 'NORMAL_USER',
};

@Injectable()
export class RoleGuard implements CanActivate {
  public role: string;

  constructor(role: string) {
    this.role = role;
  }

  /**
   * @param context
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const { role } = ctx.user.toJSON();
    return role == this.role;
  }
}
