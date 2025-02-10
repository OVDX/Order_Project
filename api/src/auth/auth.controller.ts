import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {
  AnyFilesInterceptor,
  NoFilesInterceptor,
} from '@nestjs/platform-express';

@ApiTags('Аутентифікація')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(AnyFilesInterceptor())
  @ApiOperation({ summary: 'Реєстрація' })
  @ApiResponse({ status: 201, description: 'Успішно зареєстровано.' })
  @ApiResponse({ status: 400, description: 'Неправильні данні.' })
  @ApiConsumes('multipart/form-data')
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  @UseInterceptors(AnyFilesInterceptor())
  @ApiOperation({ summary: 'Вхід' })
  @ApiResponse({ status: 200, description: 'Успішно аутентифіковано.' })
  @ApiResponse({ status: 401, description: 'Неправильні дані.' })
  @ApiConsumes('multipart/form-data')
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
