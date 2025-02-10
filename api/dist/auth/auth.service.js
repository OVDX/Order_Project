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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const users_service_1 = require("./../users/users.service");
let AuthService = class AuthService {
    constructor(jwtService, UsersService) {
        this.jwtService = jwtService;
        this.UsersService = UsersService;
    }
    async register(registerDto) {
        const existingUser = await this.UsersService.findOne(registerDto.username);
        if (existingUser) {
            throw new common_1.ConflictException('User already exists');
        }
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        console.log('При реєстрації:');
        console.log('Оригінальний пароль:', registerDto.password);
        console.log('Хешований пароль:', hashedPassword);
        const user = {
            ...registerDto,
            password: hashedPassword,
        };
        await this.UsersService.create(user.username, user.password);
        return this.generateToken(user);
    }
    async login(loginDto) {
        const user = await this.UsersService.findOne(loginDto.username);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        console.log('При логіні:');
        console.log('Введений пароль:', loginDto.password);
        console.log('Хешований пароль з бази:', user.password);
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        console.log(isPasswordValid);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return this.generateToken(user);
    }
    generateToken(user) {
        const payload = {
            username: user.username,
            sub: user.id,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UsersService])
], AuthService);
//# sourceMappingURL=auth.service.js.map