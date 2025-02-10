import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
  HttpStatus,
  HttpCode,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth-guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Клієнти')
@Controller('clients')
@ApiBearerAuth('JWT-auth')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @ApiOperation({ summary: 'Створення нового клієнта' })
  @ApiResponse({ status: 201, description: 'Клієнт успішно створений.' })
  @ApiResponse({ status: 400, description: 'Некоректні дані.' })
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createClientDto: CreateClientDto) {
    console.log(createClientDto);

    return this.clientsService.create(createClientDto);
  }
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Отримання всіх клієнтів' })
  @ApiResponse({
    status: 200,
    description: 'Список клієнтів успішно отримано.',
  })
  @ApiConsumes('multipart/form-data')
  @Get()
  async findAll() {
    return this.clientsService.findAll();
  }

  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Отримання клієнта за ID' })
  @ApiResponse({ status: 200, description: 'Клієнт знайдений.' })
  @ApiResponse({ status: 404, description: 'Клієнта не знайдено.' })
  @Get(':id')
  @ApiConsumes('multipart/form-data')
  async findOne(@Param('id') id: string) {
    try {
      return await this.clientsService.findOne(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Оновлення інформації про клієнта' })
  @ApiResponse({ status: 200, description: 'Клієнт успішно оновлений.' })
  @ApiResponse({ status: 404, description: 'Клієнта не знайдено.' })
  @Put(':id')
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    try {
      return await this.clientsService.update(id, updateClientDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @ApiOperation({ summary: 'Видалення клієнта' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse({ status: 204, description: 'Клієнт успішно видалений.' })
  @ApiResponse({ status: 404, description: 'Клієнта не знайдено.' })
  @Delete(':id')
  @ApiConsumes('multipart/form-data')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      return await this.clientsService.remove(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
