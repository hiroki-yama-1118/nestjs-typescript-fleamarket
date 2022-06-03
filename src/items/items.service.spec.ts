import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UserStatus } from '../auth/user-status.enum';
import { ItemStatus } from './item-status.enum';
import { ItemRepository } from './item.repository';
import { ItemsService } from './items.service';

//ユニットテストであり、DB接続行わないため、リポジトリをMock化する
const mockItemRepository = () => ({
  find: jest.fn(), //findという名のmock関数を定義
  findOne: jest.fn(),
  createItem: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});

const mockUser1 = {
  id: '1',
  username: 'test1',
  password: '1234',
  status: UserStatus.PREMIUM,
};
const mockUser2 = {
  id: '2',
  username: 'test2',
  password: '1234',
  status: UserStatus.FREE,
};

describe('ItemsServiceTest', () => {
  //テストモジュールからItemsServiceとItemRepositoryを受け取る変数定義
  let itemsService;
  let itemRepository;
  //ItemsServiceはクラスであるため毎テスト前にインスタンス化する必要がある
  //ItemServiceはItemRepositoryに依存しているため、ItemRepositoryのインスタンス化も必要
  beforeEach(async () => {
    //実際のモジュールと同じように記載
    const module = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: ItemRepository, //モックリポジトリを実際のリポジトリとして使用するため
          useFactory: mockItemRepository, //モックリポジトリを実際のリポジトリとして使用するため
        },
      ],
    }).compile(); //最後にモジュールのコンパイル

    //モジュールから受け取る
    itemsService = module.get<ItemsService>(ItemsService);
    itemRepository = module.get<ItemRepository>(ItemRepository);
  });

  describe('findAll', () => {
    it('正常系', async () => {
      //空オブジェクトが帰ってくるかどうが
      const expected = [];
      //モック関数の戻り値を定義するためmockResolvedValueを使用
      //DBからデータが返ってきたと仮定
      itemRepository.find.mockResolvedValue(expected);
      //テスト対象のfindAll()を呼ぶ
      const result = await itemsService.findAll();
      //これらの値が等しいかどうかをテスト
      expect(result).toEqual(expected);
    });
  });

  describe('findById', () => {
    it('正常系', async () => {
      //戻り値となる商品を定義、仮想のDBからのデータ
      const expected = {
        id: 'test-id',
        name: 'PC',
        price: 50000,
        description: '',
        status: ItemStatus.ON_SALE,
        createdAt: '',
        updateAt: '',
        userId: mockUser1.id,
        user: mockUser1,
      };
      itemRepository.findOne.mockResolvedValue(expected);
      const result = await itemsService.findById('test-id');
      expect(result).toEqual(expected);
    });

    it('異常系：商品が存在しない', async () => {
      //商品が存在しない時の仮想のデータ
      itemRepository.findOne.mockResolvedValue(null);
      //例外時のテスト
      await expect(itemsService.findById('test-id')).rejects.toThrow(
        //発生する例外
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('正常系', async () => {
      const expected = {
        id: 'test-id',
        name: 'PC',
        price: 50000,
        description: '',
        status: ItemStatus.ON_SALE,
        createdAt: '',
        updateAt: '',
        userId: mockUser1.id,
        user: mockUser1,
      };
      itemRepository.createItem.mockResolvedValue(expected);
      const result = await itemsService.create(
        {
          name: 'PC',
          price: 50000,
          description: '',
        },
        mockUser1,
      );
      expect(result).toEqual(expected);
    });
  });

  describe('updateStatus', () => {
    const mockItem = {
      id: 'test-id',
      name: 'PC',
      price: 50000,
      description: '',
      status: ItemStatus.ON_SALE,
      createdAt: '',
      updateAt: '',
      userId: mockUser1.id,
      user: mockUser1,
    };
    it('正常系', async () => {
      itemRepository.findOne.mockResolvedValue(mockItem);
      await itemsService.updateStatus('test-id', mockUser2);
      expect(itemRepository.save).toHaveBeenCalled();
    });
    it('異常系：自身の商品を購入', async () => {
      itemRepository.findOne.mockResolvedValue(mockItem);
      //例外処理
      await expect(
        itemsService.updateStatus('test-id', mockUser1),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('delete', () => {
    const mockItem = {
      id: 'test-id',
      name: 'PC',
      price: 50000,
      description: '',
      status: ItemStatus.ON_SALE,
      createdAt: '',
      updateAt: '',
      userId: mockUser1.id,
      user: mockUser1,
    };
    it('正常系', async () => {
      itemRepository.findOne.mockResolvedValue(mockItem);
      await itemsService.delete('test-id', mockUser1);
      expect(itemRepository.delete).toHaveBeenCalled();
    });
    it('異常系：他人の商品を削除', async () => {
      itemRepository.findOne.mockResolvedValue(mockItem);
      await expect(itemsService.delete('test-id', mockUser2)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
