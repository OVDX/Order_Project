import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from './../users/users.service';
export declare class AuthService {
    private jwtService;
    private UsersService;
    constructor(jwtService: JwtService, UsersService: UsersService);
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
    private generateToken;
}
