import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    // TODO: Validate email
    try {
      if (
        await this.prisma.user.findFirst({
          where: { email: createUserDto.email },
        })
      ) {
        throw new ForbiddenException('Credentials taken');
      }
      const user = await this.prisma.user.create({
        data: {
          ...createUserDto,
          email: createUserDto.email,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
