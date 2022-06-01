import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
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
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
    return await this.itemsService.findById(id);
  }
  // リクエストボディから商品のパラメーターを取得
  //  @Body()を使用 引数にキーを記述　横に変数名と型を記入
  @Post()
  @UseGuards(JwtAuthGuard)
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

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateStatus(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
    return await this.itemsService.updateStatus(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    this.itemsService.delete(id);
  }
}
