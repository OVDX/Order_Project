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
exports.ClientsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const clients_service_1 = require("./clients.service");
const create_client_dto_1 = require("./dto/create-client.dto");
const update_client_dto_1 = require("./dto/update-client.dto");
const jwt_auth_guard_1 = require("../auth/jwt.auth-guard");
const platform_express_1 = require("@nestjs/platform-express");
let ClientsController = class ClientsController {
    constructor(clientsService) {
        this.clientsService = clientsService;
    }
    async create(createClientDto) {
        console.log(createClientDto);
        return this.clientsService.create(createClientDto);
    }
    async findAll() {
        return this.clientsService.findAll();
    }
    async findOne(id) {
        try {
            return await this.clientsService.findOne(id);
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
    async update(id, updateClientDto) {
        try {
            return await this.clientsService.update(id, updateClientDto);
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
    async remove(id) {
        try {
            return await this.clientsService.remove(id);
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
};
exports.ClientsController = ClientsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Створення нового клієнта' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Клієнт успішно створений.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Некоректні дані.' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_client_dto_1.CreateClientDto]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "create", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiOperation)({ summary: 'Отримання всіх клієнтів' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Список клієнтів успішно отримано.',
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiOperation)({ summary: 'Отримання клієнта за ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Клієнт знайдений.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Клієнта не знайдено.' }),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiOperation)({ summary: 'Оновлення інформації про клієнта' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Клієнт успішно оновлений.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Клієнта не знайдено.' }),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_client_dto_1.UpdateClientDto]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Видалення клієнта' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Клієнт успішно видалений.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Клієнта не знайдено.' }),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "remove", null);
exports.ClientsController = ClientsController = __decorate([
    (0, swagger_1.ApiTags)('Клієнти'),
    (0, common_1.Controller)('clients'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [clients_service_1.ClientsService])
], ClientsController);
//# sourceMappingURL=clients.controller.js.map