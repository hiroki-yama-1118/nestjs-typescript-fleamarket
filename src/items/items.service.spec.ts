import { Test } from '@nestjs/testing';
import { ItemRepository } from './item.repository';
import { ItemsService } from './items.service';

//DBをモック化
const mockItemRepository = () => ({});

describe('ItemsServiceTest', () => {
  let itemsService;
  let itemRepository;
  //毎テスト前にItemServeiceをインスタンス化する
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: ItemRepository,
          useFactory: mockItemRepository,
        },
      ],
    }).compile();

    itemsService = module.get<ItemsService>(ItemsService);
    itemRepository = module.get<ItemRepository>(ItemRepository);
  });
});
