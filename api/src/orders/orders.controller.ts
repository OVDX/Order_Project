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
  Res,
  UseInterceptors,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt.auth-guard';

@ApiTags('Замовлення')
@Controller('orders')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Створення нового замовлення' })
  @ApiResponse({ status: 201, description: 'Замовлення успішно створене.' })
  @ApiResponse({ status: 400, description: 'Некоректні дані.' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @ApiOperation({ summary: 'Отримання всіх замовлень' })
  @ApiResponse({
    status: 200,
    description: 'Список замовлень успішно отримано.',
  })
  @Get()
  async findAll() {
    return this.ordersService.findAll();
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Отримання замовлення за ID' })
  @ApiParam({ name: 'id', description: 'ID замовлення' })
  @ApiResponse({ status: 200, description: 'Замовлення знайдене.' })
  @ApiResponse({ status: 404, description: 'Замовлення не знайдене.' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.ordersService.findOne(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @ApiOperation({ summary: 'Оновлення замовлення' })
  @ApiParam({ name: 'id', description: 'ID замовлення' })
  @ApiResponse({ status: 200, description: 'Замовлення успішно оновлене.' })
  @ApiResponse({ status: 404, description: 'Замовлення не знайдене.' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    try {
      return await this.ordersService.update(id, updateOrderDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Видалення замовлення' })
  @ApiParam({ name: 'id', description: 'ID замовлення' })
  @ApiResponse({ status: 204, description: 'Замовлення успішно видалене.' })
  @ApiResponse({ status: 404, description: 'Замовлення не знайдене.' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      return await this.ordersService.remove(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Отримання замовлень клієнта' })
  @ApiParam({ name: 'clientId', description: 'ID клієнта' })
  @ApiResponse({
    status: 200,
    description: 'Список замовлень клієнта успішно отримано.',
  })
  @Get('client/:clientId')
  async findByClient(@Param('clientId') clientId: string) {
    return this.ordersService.findByClient(clientId);
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Оновлення статусу замовлення' })
  @ApiParam({ name: 'id', description: 'ID замовлення' })
  @ApiResponse({ status: 200, description: 'Статус замовлення оновлено.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'completed' },
      },
    },
  })
  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.ordersService.updateStatus(id, status);
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Генерація інвойсу для замовлення' })
  @ApiParam({ name: 'id', description: 'ID замовлення' })
  @ApiResponse({ status: 200, description: 'Інвойс успішно згенеровано.' })
  @Get(':id/invoice')
  async generateInvoice(@Param('id') id: string, @Res() res: Response) {
    return this.ordersService.generateInvoice(id, res);
  }
}
