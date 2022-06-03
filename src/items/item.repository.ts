import { Item } from '../entities/item.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemStatus } from './item-status.enum';
import { User } from 'src/entities/user.entity';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  async createItem(createItemDto: CreateItemDto, user: User): Promise<Item> {
    const { name, price, description } = createItemDto;
    //itemリポジトリの親クラスであるrepositoryクラスのメソッドであるcreateが使用できる
    const item = this.create({
      name,
      price,
      description,
      status: ItemStatus.ON_SALE,
      createdAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
      user,
    });

    //DBに登録するためrepositoryクラスのメソッドであるsaveを使用
    await this.save(item);
    return item;
  }
}
