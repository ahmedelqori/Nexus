import { UserEntity } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async findAll() {
    const data = await this.userRepository.find();
    return data;
  }

  async createUser(user: CreateUserDto) {
    try {
      const newUser = this.userRepository.create({
        email: user.email,
        password: user.password,
        refreshToken: user.refreshToken,
      });
      await this.userRepository.save(newUser);
    } catch (err) {
      throw err;
    }
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}
