import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserStatus } from '../user-status.enum';

//ユーザー登録用
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;

  @IsEnum(UserStatus)
  status: UserStatus;
}
