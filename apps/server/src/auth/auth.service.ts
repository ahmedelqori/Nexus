import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { registerDto } from './dto/create-auth.input';
import { GraphQLError } from 'graphql';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(userInfo: registerDto) {
    try {
      const { email, password, confirmPassword } = userInfo;

      if (!email || !password || !confirmPassword)
        throw new GraphQLError('All fields required', {
          extensions: {
            code: 'BAD_REQUEST',
          },
        });
      if (password !== confirmPassword)
        throw new GraphQLError('passwords doesnt match', {
          extensions: {
            code: 'BAD_REQUEST',
          },
        });
      const findUser = await this.usersService.findUserByEmail(email);
      if (findUser)
        throw new GraphQLError('email already used', {
          extensions: {
            code: 'BAD_REQUEST',
          },
        });
      const refreshToken = await this.createRefreshToken(email);
      const accessToken = await this.createAccessToken(email);

      await this.usersService.createUser({ email, password, refreshToken });
      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }

  async createAccessToken(email: string) {
    return this.jwtService.sign(
      { email },
      { secret: process.env.ACCESS_TOKEN, expiresIn: '15m' },
    );
  }

  async createRefreshToken(email: string) {
    return this.jwtService.sign(
      { email },
      {
        secret: process.env.REFRESH_TOKEN,
        expiresIn: '7d',
      },
    );
  }

  async storeRefreshTokenInCookies(context: any, refreshToken: string) {
    context.res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
    });
  }
}
