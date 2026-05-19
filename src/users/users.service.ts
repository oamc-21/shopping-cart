import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt'
import { hash } from 'crypto';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async findByEmail(email: string): Promise<User | null >{
        return await this.userRepository.findOneBy({email});

    }

    async create(registerUserDto: RegisterUserDto): Promise<Omit<User, 'password'>>{
        const {email, password, fullName} = registerUserDto;
        const existingUser = await this.findByEmail(email);
        if(existingUser) throw new BadRequestException('Email already registered!');
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = this.userRepository.create({
            email,
            fullName,
            password: hashedPassword,
        });
        const savedUser = await this.userRepository.save(newUser);
        const {password: _, ...userWithOutPassword} = savedUser
        return userWithOutPassword;
    }
}
