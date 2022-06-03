import { Exclude } from 'class-transformer';
import { UserStatus } from '../auth/user-status.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true }) //パスワードをレスポンスから外す設定ができる
  password: string;

  @Column()
  status: UserStatus;

  //１対多の関係
  //第一引数：関連先の型をコールバック
  //第二引数：関連先のプロパティをコールバック
  @OneToMany(() => Item, (item) => item.user)
  items: Item[];
}
