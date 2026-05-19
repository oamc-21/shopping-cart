import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    async register(@Body() registerUserDto:RegisterUserDto){
        return await this.authService.register(registerUserDto);
    }

    @Post('login')
    async login(@Body() loginDto:LoginDto){
        return await this.authService.login(loginDto);
    }
}
