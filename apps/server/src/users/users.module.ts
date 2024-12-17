import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDB } from './db/user.db';

@Module({
  imports: [TypeOrmModule.forFeature([UserDB])],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
