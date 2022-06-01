import { User } from 'src/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

//クラスをリポジトリとするため
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  //引数にuserDtoを取る
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, status } = createUserDto;
    //新規ユーザー作成
    const user = this.create({
      username,
      password,
      status,
    });
    //ユーザーを渡してデータベースに追加する
    await this.save(user);
    return user;
  }
}
