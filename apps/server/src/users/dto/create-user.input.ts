import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

export class CreateUserDto {
  email: string;
  password: string;
  refreshToken: string;
}
