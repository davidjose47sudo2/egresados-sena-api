import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dni: number, password: string) {
    const user = await this.usersService.findOneByDni(dni);

    if (!(user && (await compare(password, user.password)))) {
      return null;
    }

    return user;
  }

  async register(userToCreate: RegisterDto) {
    const user = await this.usersService.findOneByDni(userToCreate.dni);

    if (user) return null;

    userToCreate.password = await hash(userToCreate.password, await genSalt());
    return await this.usersService.create(userToCreate);
  }

  async createToken(payload: object) {
    return await this.jwtService.signAsync(payload, {});
  }
}
