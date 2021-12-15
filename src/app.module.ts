import { Module } from '@nestjs/common';
import * as joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
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
