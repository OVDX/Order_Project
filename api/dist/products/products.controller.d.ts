import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<import("./products.schema").Product>;
    findAll(): Promise<import("./products.schema").Product[]>;
    findOne(id: string): Promise<import("./products.schema").Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("./products.schema").Product>;
    remove(id: string): Promise<{
        message: string;
    }>;
    removeImage(id: string): Promise<import("./products.schema").Product>;
}
