import { SetMetadata } from '@nestjs/common';

//デコレーターで渡された値をキーバリューの形式でメタデータとして登録
export const Role = (...statuses: string[]) =>
  SetMetadata('statuses', statuses);
