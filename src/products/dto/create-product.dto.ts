import { IsString, IsNotEmpty, IsNumber, IsOptional, IsPositive, Min, Length } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price!: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  stock?: number;
}