import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Matches(/^[a-zA-Z0-9~!^*]{4,20}$/, {
    message:
      '입력 범위를 벗어났거나 (~, !, ^, *) 의외의 특수문자가 포함되었습니다. (4~20 byte)',
  })
  nickname: string;

  @IsEmail()
  email: string;

  @IsString()
  provider: string;

  @IsString()
  uid: string;
}
