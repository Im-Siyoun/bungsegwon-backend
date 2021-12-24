import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Store, StoreDocument } from '../stores/schemas/stores.schema';
import { User } from '../users/schemas/users.schema';
import { UsersService } from '../users/users.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

export class StoresService {
  constructor(
    @InjectModel(Store.name) private storeModel: Model<StoreDocument>,
    private readonly userService: UsersService,
  ) {}

  async create(id: string, storedto: CreateStoreDto): Promise<User> {
    const store = { ...storedto };
    const result = await this.storeModel.create(store);
    const user = await this.userService.storePost(id, result._id);

    return user;
  }

  async update(
    id: string,
    storeid: string,
    updatestoredto: UpdateStoreDto,
  ): Promise<Store> {
    const store = await this.storeModel.findOne({ _id: storeid });
    if (store.uid !== id) {
      throw new Error('권한이 없습니다!');
    }
    const result = await store.update(updatestoredto);

    return result;
  }

  async delete(id: string, storeid: string): Promise<Store> {
    const store = await this.storeModel.findOne({ _id: storeid });
    if (store.uid !== id) {
      throw new Error('권한이 없습니다!');
    }
    const result = await store.delete();

    return result;
  }

  async findAll(): Promise<Store[]> {
    const result = await this.storeModel.find();

    return result;
  }
}
