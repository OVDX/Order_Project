"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const PDFDocument = require("pdfkit");
const clients_service_1 = require("../clients/clients.service");
const products_service_1 = require("../products/products.service");
let OrdersService = class OrdersService {
    constructor(orderModel, clientsService, productService) {
        this.orderModel = orderModel;
        this.clientsService = clientsService;
        this.productService = productService;
    }
    async create(createOrderDto) {
        const newOrder = new this.orderModel({
            ...createOrderDto,
            items: createOrderDto.items.map((item) => ({
                product: item.product,
                quantity: item.quantity,
            })),
        });
        return newOrder.save();
    }
    async findAll() {
        return this.orderModel
            .find()
            .populate('client')
            .populate('items.product')
            .exec();
    }
    async findOne(id) {
        const order = await this.orderModel
            .findById(id)
            .populate('client')
            .populate('items.product')
            .exec();
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        return order;
    }
    async generateInvoice(orderId, res) {
        const order = await this.orderModel
            .findById(orderId)
            .populate('client')
            .populate('items.product')
            .exec();
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=invoice-${order.orderNumber}.pdf`);
        doc.pipe(res);
        doc.fontSize(25).text('Invoice', 100, 50);
        doc
            .fontSize(14)
            .text(`Number of order: ${order.orderNumber}`, 100, 90)
            .text(`Date: ${order.date.toLocaleDateString()}`, 100, 110)
            .text(`Client: ${order.client['name']}`, 100, 130)
            .text(`Status: ${order.status}`, 100, 150);
        let y = 180;
        doc.fontSize(14).text('Products:', 100, y);
        y += 20;
        let total = 0;
        for (const item of order.items) {
            const product = item.product;
            const itemTotal = item.quantity * product.price;
            total += itemTotal;
            doc.text(`${product.name} - ${item.quantity} x $${product.price} = $${itemTotal}`, 120, y);
            y += 20;
        }
        doc.fontSize(16).text(`Total: $${total}`, 100, y + 20);
        doc.end();
    }
    async update(id, updateOrderDto) {
        const existingOrder = await this.orderModel.findById(id);
        if (!existingOrder) {
            throw new common_1.NotFoundException('Order not found');
        }
        if (updateOrderDto.items) {
            const updatedItems = updateOrderDto.items.map((item) => {
                const existingItem = existingOrder.items.find((i) => i.product.toString() === item.product);
                return {
                    product: new mongoose_2.Types.ObjectId(item.product || existingItem?.product.toString()),
                    quantity: item.quantity ?? existingItem?.quantity ?? 0,
                };
            });
            existingOrder.items = updatedItems;
        }
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
            existingOrder.client = new mongoose_2.Types.ObjectId(updateOrderDto.client);
        }
        return existingOrder.save();
    }
    async remove(id) {
        const result = await this.orderModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException('Order not found');
        }
        return { message: 'Order deleted successfully' };
    }
    async findByClient(clientId) {
        return this.orderModel
            .find({ client: clientId })
            .populate('client')
            .populate('items.product')
            .exec();
    }
    async updateStatus(id, status) {
        if (!['pending', 'completed', 'cancelled'].includes(status)) {
            throw new Error('Invalid status value');
        }
        const updatedOrder = await this.orderModel
            .findByIdAndUpdate(id, { status }, { new: true })
            .populate('client')
            .populate('items.product')
            .exec();
        if (!updatedOrder) {
            throw new common_1.NotFoundException('Order not found');
        }
        return updatedOrder;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Order')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        clients_service_1.ClientsService,
        products_service_1.ProductsService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map