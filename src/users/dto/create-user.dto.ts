import { $Enums } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsStrongPassword,
} from 'class-validator';
import { User } from '../entities/User.entity';

export class CreateUserDto
  implements Omit<User, 'id' | 'role'>, Partial<Pick<User, 'role'>>
{
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly dni: number;

  @IsNotEmpty()
  @IsStrongPassword({ minSymbols: 0 })
  password: string;

  @IsOptional()
  @IsEnum($Enums.Role)
  readonly role?: $Enums.Role;
}
