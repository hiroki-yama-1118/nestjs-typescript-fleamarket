import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Item } from '../entities/item.entity';
import { User } from '../entities/user.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemStatus } from './item-status.enum';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemsService {
  //リポジトリとDIする（依存性注入。コンピュータプログラムのデザインパターンの一つで、オブジェクトなどの間に生じる依存関係をオブジェクト内のコードに直接記述せず、外部から何らかの形で与えるようにする手法）
  constructor(private readonly itemRepository: ItemRepository) {}

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async findById(id: string): Promise<Item> {
    const found = await this.itemRepository.findOne(id);
    //例外スロー
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create(createItemDto: CreateItemDto, user: User): Promise<Item> {
    return await this.itemRepository.createItem(createItemDto, user);
  }

  async updateStatus(id: string, user: User): Promise<Item> {
    const item = await this.findById(id);
    //例外スロー
    if (item.userId === user.id) {
      throw new BadRequestException('自身の商品を購入することはできません');
    }
    item.status = ItemStatus.SOLD_OUT;
    item.updateAt = new Date().toISOString();
    //データベースのデータ更新
    await this.itemRepository.save(item);
    return item;
  }

  async delete(id: string, user: User): Promise<void> {
    const item = await this.findById(id);
    //例外スロー
    if (item.userId !== user.id) {
      throw new BadRequestException('他人の商品を削除することはできません');
    }
    //データベースのデータ更新
    await this.itemRepository.delete({ id });
  }
}
