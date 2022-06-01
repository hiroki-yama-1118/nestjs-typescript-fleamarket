import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from 'src/entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemStatus } from './item-status.enum';
// import { v4 as uuid } from 'uuid';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemsService {
  constructor(private readonly itemRepository: ItemRepository) {}
  // private items: Item[] = [];
  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async findById(id: string): Promise<Item> {
    // const found = this.items.find((item) => item.id === id);
    const found = await this.itemRepository.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemRepository.createItme(createItemDto);
    // //新しくitemを定義
    // const item: Item = {
    //   id: uuid(), //自動採番
    //   ...createItemDto, //createItemDtoの中身を展開
    //   status: ItemStatus.ON_SALE,
    // };
    // this.items.push(item);
    // return item;
  }

  async updateStatus(id: string): Promise<Item> {
    const item = await this.findById(id);
    item.status = ItemStatus.SOLD_OUT;
    item.updateAt = new Date().toISOString();
    await this.itemRepository.save(item);
    return item;
  }

  async delete(id: string): Promise<void> {
    await this.itemRepository.delete({ id });
    // this.items = this.items.filter((item) => item.id !== id);
  }
}
