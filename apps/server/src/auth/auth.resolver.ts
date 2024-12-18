import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { registerDto } from './dto/create-auth.input';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => Boolean, { name: 'auth' })
  findAll() {
    return 1;
  }

  @Mutation(() => Auth)
  async register(@Args('user') user: registerDto) {
    return await this.authService.register(user);
  }
}
