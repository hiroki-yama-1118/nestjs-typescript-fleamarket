import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
//ガードとして機能させるためにCanActivateを使用
//JWTはauthguard側で実装されていたので記載しなかった
export class RolesGuard implements CanActivate {
  //デコレーターでセットしたメタデータを取得するもの
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    //第一引数：取得したメタデータのキー
    //第二引数：ハンドラーのメタデータ取得
    const requiredStatuses = this.reflector.get<string[]>(
      'statuses',
      ctx.getHandler(),
    );
    if (!requiredStatuses) {
      return true;
    }
    //ユーザー情報取得
    const { user } = ctx.switchToHttp().getRequest();
    return requiredStatuses.some((status) => user.status.includes(status));
  }
}
