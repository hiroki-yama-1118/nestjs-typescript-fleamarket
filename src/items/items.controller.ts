import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Item } from 'src/entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
// import { ItemStatus } from './item-status.enum';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return await this.itemsService.findAll();
  }

  @Get(':id') // /items/id
  findById(@Param('id', ParseUUIDPipe) id: string): Item {
    return this.itemsService.findById(id);
  }
  // リクエストボディから商品のパラメーターを取得
  //  @Body()を使用 引数にキーを記述　横に変数名と型を記入
  @Post()
  async create(
    @Body() createItemDto: CreateItemDto,
    //DTOを使って書き換え
    // @Body('id') id: string,
    // @Body('name') name: string,
    // @Body('price') price: number,
    // @Body('description') description: string,
  ): Promise<Item> {
    //serviceでitemを定義する
    // const item: Item = {
    //   id,
    //   name,
    //   price,
    //   description,
    //   status: ItemStatus.ON_SALE,
    // };
    return await this.itemsService.create(createItemDto);
  }

  // @Patch(':id')
  // updateStatus(@Param('id', ParseUUIDPipe) id: string): Item {
  //   return this.itemsService.updateStatus(id);
  // }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string): void {
    this.itemsService.delete(id);
  }
}
