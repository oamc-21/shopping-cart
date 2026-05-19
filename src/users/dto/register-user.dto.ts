import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class RegisterUserDto {
  @IsEmail({}, { message: 'Email not valid!' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is requird' })
  @MinLength(6, { message: 'Password must be 6 characters at least' })
  @MaxLength(20, { message: 'Password limit is 20 characters' })
  password!: string;

  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(3, { message: 'Name must be 3 characters at least' })
  fullName!: string;
}