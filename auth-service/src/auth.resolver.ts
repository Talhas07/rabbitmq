import { Resolver, Query, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => User)
  async validate(@Args('id') id: string) {
    console.log('hello');
    return this.authService.validateUser(id);
  }
}
