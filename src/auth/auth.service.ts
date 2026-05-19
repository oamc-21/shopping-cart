import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ){}
    
    async register(registerUserDto: RegisterUserDto){
        return await this.usersService.create(registerUserDto);

    }

    async login(loginDto: LoginDto){
        const {email, password} = loginDto;
        const user = await this.usersService.findByEmail(email);
        if(!user) throw new UnauthorizedException('Invalid credentials');

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role
        }
        return{
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                role: user.role
            },
            accessToken: this.jwtService.sign(payload)
        }
    }
}
