import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

//クラスバリデーターを使うためにタイプエイリアスで定義
export class CreateItemDto {
  // id: string; uuidで採番するため削除

  @IsString() //文字列
  @IsNotEmpty() //1文字以上
  @MaxLength(40) //40文字以上
  name: string;

  @IsInt() //数字
  @Min(1) //1文字以上
  @Type(() => Number) //プロパティをnumber型に認識するように
  price: number;

  @IsString() //文字列
  @IsNotEmpty() //1文字以上
  description: string;
}
