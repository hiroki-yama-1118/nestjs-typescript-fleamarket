import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  //ORMを使用するためにTypeOrmModuleを記述
  //.forRootに設定を記述できる
  //今回はORMを使用してDBを作成するため、ORMConfigに設定記載
  imports: [ItemsModule, TypeOrmModule.forRoot(), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
