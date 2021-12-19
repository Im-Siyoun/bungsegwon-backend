import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UsersService } from 'src/modules/users/users.service';

import { Auth } from './auth.payload';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private usersService: UsersService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    const { emails } = profile;

    const user = await this.usersService.findByEmail(emails[0].value);
    if (!user) {
      return { token: _accessToken };
    }

    const payload: Auth = {
      token: _accessToken,
      user: {
        _id: user._id,
        nickname: user.nickname,
        email: user.email,
        provider: 'google.com',
      },
    };

    return payload;
  }
}
