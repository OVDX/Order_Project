import { Model } from 'mongoose';
import { Product } from './products.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsService {
    private readonly productModel;
    constructor(productModel: Model<Product>);
    create(createProductDto: CreateProductDto): Promise<Product>;
    createWithImage(createProductDto: CreateProductDto, imageUrl: string): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
    updateImage(id: string, imageUrl: string): Promise<Product>;
    remove(id: string): Promise<{
        message: string;
    }>;
    removeImage(id: string): Promise<Product>;
}
