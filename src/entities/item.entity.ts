import { ItemStatus } from '../items/item-status.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Item {
  //自動採番であることを示す
  //idはuuidにしたいので引数に指定、指定しないと連番になる
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  status: ItemStatus;

  @Column()
  createdAt: string;

  @Column()
  updateAt: string;

  //多対１
  //第一引数：関連先の型をコールバック
  //第二引数：関連先のプロパティをコールバック
  @ManyToOne(() => User, (user) => user.items)
  user: User;

  @Column()
  userId: string;
}
