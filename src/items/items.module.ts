import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ItemRepository } from './item.repository';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  //リポジトリを使用するためTypeOrmModule.forFeature([ItemRepository])を記載
  //AuthModuleを使用するため
  imports: [TypeOrmModule.forFeature([ItemRepository]), AuthModule],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
