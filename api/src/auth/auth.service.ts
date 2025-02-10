import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from './../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private UsersService: UsersService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.UsersService.findOne(registerDto.username);
    if (existingUser) {
      throw new ConflictException('User already exists');
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

  async login(loginDto: LoginDto) {
    const user = await this.UsersService.findOne(loginDto.username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    console.log('При логіні:');
    console.log('Введений пароль:', loginDto.password);
    console.log('Хешований пароль з бази:', user.password);
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user);
  }

  private generateToken(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
