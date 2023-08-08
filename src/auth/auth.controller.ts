import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { JWT_COOKIE_NAME } from './auth.constants';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.login(body.dni, body.password);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const { id, dni, role } = user;
    res.cookie(JWT_COOKIE_NAME, await this.authService.createToken({ id, dni, role }), {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24,
      secure: true,
      sameSite: 'none',
      domain:"vercel.app"
    });

    return { message: 'Login success' };
  }

  @Post('register')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() Body: RegisterDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.register(Body);

    if (!user) throw new BadRequestException('User already exists');

    const { id, dni, role } = user;
    res.cookie(JWT_COOKIE_NAME, await this.authService.createToken({ id, dni, role }));

    return { message: 'Register success' };
  }
}
