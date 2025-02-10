import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Response } from 'express';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<import("./orders.schema").Order>;
    findAll(): Promise<import("./orders.schema").Order[]>;
    findOne(id: string): Promise<import("./orders.schema").Order>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<import("./orders.schema").Order>;
    remove(id: string): Promise<{
        message: string;
    }>;
    findByClient(clientId: string): Promise<import("./orders.schema").Order[]>;
    updateStatus(id: string, status: string): Promise<import("./orders.schema").Order>;
    generateInvoice(id: string, res: Response): Promise<void>;
}
