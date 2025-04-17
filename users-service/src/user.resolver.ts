import { Query, Resolver, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.model';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  user(@Args('id') id: string) {
    return this.userService.getUser(id);
  }
}
