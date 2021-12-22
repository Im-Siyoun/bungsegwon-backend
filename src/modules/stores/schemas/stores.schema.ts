import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { LocationType, MenuType } from './location.type';

@Schema({ timestamps: true, versionKey: false })
export class Store {
  @Prop({
    required: true,
    type: String,
  })
  address: string;

  @Prop({
    required: true,
    type: String,
  })
  creator: string;

  @Prop({
    required: true,
    type: String,
  })
  description: string;

  @Prop({
    required: true,
    type: String,
  })
  detail_address: string;

  @Prop({
    required: true,
    type: Object,
  })
  location: LocationType;

  @Prop({
    required: true,
    type: String,
  })
  main_menu: string;

  @Prop({
    required: true,
    type: Array,
  })
  menus: MenuType[];

  @Prop({
    type: String,
  })
  name: string;

  @Prop({
    required: true,
    type: String,
  })
  uid: string;
}

export type StoreDocument = Store & Document;

export const StoreSchema = SchemaFactory.createForClass(Store);
