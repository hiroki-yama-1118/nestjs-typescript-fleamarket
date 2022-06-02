import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//デコレーターを自作
//第一引数：今回は使用しないため_
//第二引数実行中の一連の処理を取得する
export const GetUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
