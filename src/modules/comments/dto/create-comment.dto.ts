import { IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsOptional()
  uid: string;

  @IsString()
  sid: string;

  @IsString()
  comment: string;

  @IsString()
  name: string;
}
