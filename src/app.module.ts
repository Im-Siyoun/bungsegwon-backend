import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as joi from 'joi';

import { AuthModule } from './modules/auth/auth.module';
import { CommentsModule } from './modules/comments/comment.module';
import { GoogleOauthModule } from './modules/googleoauth2/google.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    CommentsModule,
    UsersModule,
    GoogleOauthModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.env' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: joi.object({
        NODE_ENV: joi
          .string()
          .valid('development', 'production', 'test')
          .required(),
        DB_URI: joi.string().required(),
        DB_USER: joi.string().required(),
        DB_PASSWORD: joi.string().required(),
        GOOGLE_CLIENT_ID: joi.string().required(),
        GOOGLE_SECRET: joi.string().required(),
        GOOGLE_CALLBACK_URL: joi.string().required(),
      }),
    }),
    MongooseModule.forRoot(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
    }),
  ],
  providers: [],
})
export class AppModule {}
