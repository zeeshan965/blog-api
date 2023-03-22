import { Query, Resolver } from '@nestjs/graphql';

@Resolver(() => String)
export class AppResolver {
  /**
   *
   */
  @Query(() => String)
  index(): string {
    console.trace();
    return 'Nest JS GQL';
  }
}
