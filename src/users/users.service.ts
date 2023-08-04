import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prismaService.user.create({ data: createUserDto });
    } catch (e: unknown) {
      return null;
    }
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  findOneByDni(dni: number) {
    return this.prismaService.user.findUnique({ where: { dni } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({ where: { id }, data: updateUserDto });
  }
}
