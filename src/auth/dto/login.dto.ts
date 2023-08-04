import { Prisma } from '@prisma/client';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class LoginDto
  implements Pick<Prisma.UserUncheckedCreateInput, 'dni' | 'password'>
{
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly dni: number;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({ minSymbols: 0 })
  readonly password: string;
}
