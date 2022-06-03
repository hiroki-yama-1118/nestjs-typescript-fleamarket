import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    //モジュールにリポジトリを登録
    TypeOrmModule.forFeature([UserRepository]),
    //JWTを使用するため
    PassportModule.register({ defaultStrategy: 'jwt' }),
    //JWTの設定
    JwtModule.register({
      secret: 'secretKey123',
      signOptions: {
        expiresIn: 3600, //期限１時間
      },
    }),
  ],
  controllers: [AuthController],
  //JWTを使用するため、ガードも、ロールスガードも
  providers: [AuthService, JwtStrategy, JwtAuthGuard, RolesGuard],
  //JWTをItemで使用したいため、ガードも、ロールスガードも
  exports: [JwtStrategy, JwtAuthGuard, RolesGuard],
})
export class AuthModule {}
