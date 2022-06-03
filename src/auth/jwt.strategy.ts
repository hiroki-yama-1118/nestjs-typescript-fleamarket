import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  //リポジトリをDIする
  constructor(private userRepository: UserRepository) {
    //superを使って親クラスのコンストラクタにオブジェクトを渡す
    super({
      //リクエストのどの部分にJWTを記載するかを設定
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, //トークンの有効期限が来たらエラーにする
      secretOrKey: 'secretKey123',
    });
  }

  //名前はvalidateでないとダメ
  async validate(payload: { id: string; username: string }): Promise<User> {
    const { id, username } = payload;
    const user = await this.userRepository.findOne({ id, username });

    //ユーザーが取得できた場合
    if (user) {
      return user;
    }
    //例外処理
    throw new UnauthorizedException();
  }
}
