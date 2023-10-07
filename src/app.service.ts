import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class AppService {
  constructor(private readonly prismaServices: PrismaService) { }

  async create(createMessageDto: CreateMessageDto) {
    return await this.prismaServices.generatorModule.create({
      data: {
        data: createMessageDto.data,
      },
    })
  }
  async findAll() {
    return await this.prismaServices.generatorModule.findMany({

    })
  }
  async findOne(id: string) {
    return await this.prismaServices.generatorModule.findUnique({
      where: { id }

    })
  }
  async update(id: string, createMessageDto: CreateMessageDto) {
    return await this.prismaServices.generatorModule.update({
      where: { id },
      data: {
        data: createMessageDto.data,
      }
    })
  }
  async delete(id: string) {
    return await this.prismaServices.generatorModule.delete({
      where: { id }
    })
  }
}
