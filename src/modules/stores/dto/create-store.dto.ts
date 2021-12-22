import { IsArray, IsObject, IsString } from 'class-validator';

import { LocationType } from '../schemas/location.type';

export class CreateStoreDto {
  @IsString()
  address: string;

  @IsString()
  creator: string;

  @IsString()
  description: string;

  @IsString()
  detail_address: string;

  @IsString()
  main_menu: string;

  @IsString()
  name: string;

  @IsString()
  uid: string;

  @IsArray()
  menus: string[];

  @IsObject()
  location: LocationType;
}
