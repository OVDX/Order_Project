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
  UseInterceptors,
  UseGuards,
  UploadedFile,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt.auth-guard';
import { Multer } from 'multer'; // Додали цей імпорт

@ApiTags('Товари')
@Controller('products')
@ApiBearerAuth('JWT-auth')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProductDto: CreateProductDto) {
    console.log(createProductDto);
    return this.productsService.create(createProductDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.productsService.findOne(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      return await this.productsService.update(id, updateProductDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      return await this.productsService.remove(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':id/image')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeImage(@Param('id') id: string) {
    try {
      return await this.productsService.removeImage(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
