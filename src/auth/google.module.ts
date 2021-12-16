import { Module } from '@nestjs/common';

import { GoogleOauthController } from './google.controller';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [],
  controllers: [GoogleOauthController],
  providers: [GoogleStrategy],
})
export class GoogleOauthModule {}
