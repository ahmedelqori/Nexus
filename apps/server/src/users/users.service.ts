import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDB } from './db/user.db';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserDB) private userRepository: Repository<UserDB>,
  ) {}
  findAll() {
    return this.userRepository.find();
  }
}
