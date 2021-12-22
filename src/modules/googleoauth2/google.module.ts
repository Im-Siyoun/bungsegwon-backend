import { Module } from '@nestjs/common';
import { UsersModule } from 'src/modules/users/users.module';

import { GoogleOauthController } from './google.controller';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [UsersModule],
  controllers: [GoogleOauthController],
  providers: [GoogleStrategy],
})
export class GoogleOauthModule {}
