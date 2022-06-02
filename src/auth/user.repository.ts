import { User } from '../entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

//クラスをリポジトリとするため
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  //引数にuserDtoを取る
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, status } = createUserDto;
    //ハッシュ値の強度を高めるための文字列
    //ハッシュ化前のパスワードに付加することでより強固なパスワードのハッシュ化ができる
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    //新規ユーザー作成
    const user = this.create({
      username,
      password: hashPassword,
      status,
    });
    //ユーザーを渡してデータベースに追加する
    await this.save(user);
    return user;
  }
}
