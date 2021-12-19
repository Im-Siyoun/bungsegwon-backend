import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async ValidateUser(token: string): Promise<any> {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const response = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo/',
    );
    const user = await this.userService.findByEmail(response.data.email);
    if (!user) {
      return { email: response.data.email };
    }
    const cookie = await this.login({
      id: user._id,
      nickname: user.nickname,
      email: user.email,
      provider: 'google.com',
    });

    return cookie;
  }

  async login(user: any) {
    return this.jwtService.sign(user);
  }

  async verifyToken(token: string) {
    return this.jwtService.verify(token);
  }
}
