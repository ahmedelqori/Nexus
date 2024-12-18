import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthInput {
  @Field(() => Int)
  id: number;
}
