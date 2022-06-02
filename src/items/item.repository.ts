import { Item } from '../entities/item.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemStatus } from './item-status.enum';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  async createItme(createItemDto: CreateItemDto, user): Promise<Item> {
    const { name, price, description } = createItemDto;
    const item = this.create({
      name,
      price,
      description,
      status: ItemStatus.ON_SALE,
      createdAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
      user,
    });

    await this.save(item);
    return item;
  }
}
