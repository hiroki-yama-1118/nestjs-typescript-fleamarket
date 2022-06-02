import { Exclude } from 'class-transformer';
import { UserStatus } from 'src/auth/user-status.enum';
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
  @OneToMany(() => Item, (item) => item.user)
  items: Item[];
}
