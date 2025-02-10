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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const orders_service_1 = require("./orders.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_dto_1 = require("./dto/update-order.dto");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../auth/jwt.auth-guard");
let OrdersController = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async create(createOrderDto) {
        return this.ordersService.create(createOrderDto);
    }
    async findAll() {
        return this.ordersService.findAll();
    }
    async findOne(id) {
        try {
            return await this.ordersService.findOne(id);
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
    async update(id, updateOrderDto) {
        try {
            return await this.ordersService.update(id, updateOrderDto);
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
    async remove(id) {
        try {
            return await this.ordersService.remove(id);
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
    async findByClient(clientId) {
        return this.ordersService.findByClient(clientId);
    }
    async updateStatus(id, status) {
        return this.ordersService.updateStatus(id, status);
    }
    async generateInvoice(id, res) {
        return this.ordersService.generateInvoice(id, res);
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Створення нового замовлення' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Замовлення успішно створене.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Некоректні дані.' }),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Отримання всіх замовлень' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Список замовлень успішно отримано.',
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiOperation)({ summary: 'Отримання замовлення за ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID замовлення' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Замовлення знайдене.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Замовлення не знайдене.' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Оновлення замовлення' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID замовлення' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Замовлення успішно оновлене.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Замовлення не знайдене.' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiOperation)({ summary: 'Видалення замовлення' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID замовлення' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Замовлення успішно видалене.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Замовлення не знайдене.' }),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiOperation)({ summary: 'Отримання замовлень клієнта' }),
    (0, swagger_1.ApiParam)({ name: 'clientId', description: 'ID клієнта' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Список замовлень клієнта успішно отримано.',
    }),
    (0, common_1.Get)('client/:clientId'),
    __param(0, (0, common_1.Param)('clientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findByClient", null);
__decorate([
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiOperation)({ summary: 'Оновлення статусу замовлення' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID замовлення' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Статус замовлення оновлено.' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                status: { type: 'string', example: 'completed' },
            },
        },
    }),
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "updateStatus", null);
__decorate([
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiOperation)({ summary: 'Генерація інвойсу для замовлення' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID замовлення' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Інвойс успішно згенеровано.' }),
    (0, common_1.Get)(':id/invoice'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "generateInvoice", null);
exports.OrdersController = OrdersController = __decorate([
    (0, swagger_1.ApiTags)('Замовлення'),
    (0, common_1.Controller)('orders'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map