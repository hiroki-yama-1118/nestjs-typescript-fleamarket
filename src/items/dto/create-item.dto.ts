//クラスバリデーターを使うためにタイプエイリアスで定義
export class CreateItemDto {
  // id: string; uuidで採番するため削除
  name: string;
  price: number;
  description: string;
}
