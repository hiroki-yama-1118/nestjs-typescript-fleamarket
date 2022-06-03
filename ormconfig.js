//ORMを用いてDBを作成するため設定を記載
module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  autoLoadEntities: true, //ORMにEntityを毎回追加することを省略できる
  entities: ['dist/entities/*.entity.js'], //マイグレーションファイルを作成する時にどのファイルを使用するかの設定
  migrations: ['dist/migrations/*.js'], //どのマイグレーションファイルを指定するか
  cli: {
    entitiesDir: '../entities', //ファイル作成の出力先
    migrationsDir: '../migrations',
  },
};
