import { Model } from 'mongoose';
import { Order } from './orders.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Response } from 'express';
import { ClientsService } from 'src/clients/clients.service';
import { ProductsService } from 'src/products/products.service';
export declare class OrdersService {
    private readonly orderModel;
    private readonly clientsService;
    private readonly productService;
    constructor(orderModel: Model<Order>, clientsService: ClientsService, productService: ProductsService);
    create(createOrderDto: CreateOrderDto): Promise<Order>;
    findAll(): Promise<Order[]>;
    findOne(id: string): Promise<Order>;
    generateInvoice(orderId: string, res: Response): Promise<void>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order>;
    remove(id: string): Promise<{
        message: string;
    }>;
    findByClient(clientId: string): Promise<Order[]>;
    updateStatus(id: string, status: string): Promise<Order>;
}
