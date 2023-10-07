import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Res,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common'
import { Response } from 'express';
import { AppService } from './app.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller("data")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto, @Res({ passthrough: true }) res: Response) {
    try {
      const message = await this.appService.create(createMessageDto)
      return {
        success: true,
        message: 'Data created !',
        data: message,
      }
    } catch (error) {
      res.status(error.status || 500)
      return {
        success: false,
        message: error.message,
        data: null,
      }
    }
  }

  @Get()
  async findAll(@Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: 'All Data fetched !',
        data: await this.appService.findAll(),
      }
    } catch (error) {
      res.status(error.status || 500)
      return {
        success: false,
        message: error.message,
        data: null,
      }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: 'One Data fetched !',
        data: await this.appService.findOne(id),
      }
    } catch (error) {
      res.status(error.status || 500)
      return {
        success: false,
        message: error.message,
        data: null,
      }
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMessageDto: CreateMessageDto, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: 'Data Updated !',
        data: await this.appService.update(id, updateMessageDto)
      }
    } catch (error) {
      res.status(error.status || 500)
      return {
        success: false,
        message: error.message,
        data: null,
      }
    }
  }

  @Delete(':id')
  async remove(
    @Param('id', new ValidationPipe({ transform: true })) id: string, @Res({ passthrough: true }) res: Response
  ) {
    try {
      return {
        success: true,
        message: 'Data deleted !',
        data: await this.appService.delete(id),
      }
    } catch (error) {
      res.status(error.status || 500)
      return {
        success: false,
        message: error.message,
        data: null,
      }
    }
  }
}
