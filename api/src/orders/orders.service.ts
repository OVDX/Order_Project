import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order } from './orders.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import * as PDFDocument from 'pdfkit';
import { Response } from 'express';
import { ClientsService } from 'src/clients/clients.service';
import { async } from 'rxjs';
import { ProductsService } from 'src/products/products.service';
import { Client } from 'src/clients/clients.schema';
import { Product } from 'src/products/products.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    private readonly clientsService: ClientsService,
    private readonly productService: ProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = new this.orderModel({
      ...createOrderDto,
      items: createOrderDto.items.map((item) => ({
        product: item.product,
        quantity: item.quantity,
      })),
    });
    return newOrder.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel
      .find()
      .populate('client')
      .populate('items.product')
      .exec();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel
      .findById(id)
      .populate('client')
      .populate('items.product')
      .exec();
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async generateInvoice(orderId: string, res: Response): Promise<void> {
    // Find order and populate references
    const order = await this.orderModel
      .findById(orderId)
      .populate('client')
      .populate('items.product')
      .exec();

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Create PDF document
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=invoice-${order.orderNumber}.pdf`,
    );
    doc.pipe(res);

    // Add header information
    doc.fontSize(25).text('Invoice', 100, 50);
    doc
      .fontSize(14)
      .text(`Number of order: ${order.orderNumber}`, 100, 90)
      .text(`Date: ${order.date.toLocaleDateString()}`, 100, 110)
      .text(`Client: ${order.client['name']}`, 100, 130)
      .text(`Status: ${order.status}`, 100, 150);

    // Add items section
    let y = 180;
    doc.fontSize(14).text('Products:', 100, y);
    y += 20;

    // Calculate total and add items
    let total = 0;
    for (const item of order.items) {
      const product = item.product as any;
      const itemTotal = item.quantity * product.price;
      total += itemTotal;

      doc.text(
        `${product.name} - ${item.quantity} x $${product.price} = $${itemTotal}`,
        120,
        y,
      );
      y += 20;
    }

    // Add total
    doc.fontSize(16).text(`Total: $${total}`, 100, y + 20);

    // Finalize the PDF
    doc.end();
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const existingOrder = await this.orderModel.findById(id);
    if (!existingOrder) {
      throw new NotFoundException('Order not found');
    }

    if (updateOrderDto.items) {
      const updatedItems = updateOrderDto.items.map((item) => {
        const existingItem = existingOrder.items.find(
          (i) => i.product.toString() === item.product,
        );

        return {
          product: new Types.ObjectId(
            item.product || existingItem?.product.toString(),
          ),
          quantity: item.quantity ?? existingItem?.quantity ?? 0,
        };
      });

      // Type assertion to ensure the items array matches the schema
      existingOrder.items = updatedItems as {
        product: Types.ObjectId | Product;
        quantity: number;
      }[];
    }

    // Update other fields
    if (updateOrderDto.orderNumber) {
      existingOrder.orderNumber = updateOrderDto.orderNumber;
    }
    if (updateOrderDto.status) {
      const status = updateOrderDto.status;
      if (!['pending', 'completed', 'cancelled'].includes(status)) {
        throw new Error('Invalid status value');
      }
    }
    if (updateOrderDto.client) {
      existingOrder.client = new Types.ObjectId(updateOrderDto.client);
    }

    return existingOrder.save();
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.orderModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Order not found');
    }
    return { message: 'Order deleted successfully' };
  }

  async findByClient(clientId: string): Promise<Order[]> {
    return this.orderModel
      .find({ client: clientId })
      .populate('client')
      .populate('items.product')
      .exec();
  }

  async updateStatus(id: string, status: string): Promise<Order> {
    if (!['pending', 'completed', 'cancelled'].includes(status)) {
      throw new Error('Invalid status value');
    }
    const updatedOrder = await this.orderModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .populate('client')
      .populate('items.product')
      .exec();
    if (!updatedOrder) {
      throw new NotFoundException('Order not found');
    }
    return updatedOrder;
  }
}
