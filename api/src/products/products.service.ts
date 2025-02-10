import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './products.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async createWithImage(
    createProductDto: CreateProductDto,
    imageUrl: string,
  ): Promise<Product> {
    const productData = {
      ...createProductDto,
      image: imageUrl,
    };
    const newProduct = new this.productModel(productData);
    return newProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }
    return updatedProduct;
  }

  async updateImage(id: string, imageUrl: string): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, { image: imageUrl }, { new: true })
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }
    return updatedProduct;
  }

  async remove(id: string): Promise<{ message: string }> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Тут можна додати логіку видалення файлу зображення, якщо потрібно
    // if (product.image) {
    //   await this.fileService.deleteFile(product.image);
    // }

    await this.productModel.findByIdAndDelete(id).exec();
    return { message: 'Product deleted successfully' };
  }

  async removeImage(id: string): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, { $unset: { image: 1 } }, { new: true })
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }
    return updatedProduct;
  }
}
