import { IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';

export class AddToCartDto {
  @IsNumber()
  @IsNotEmpty({ message: 'ID is required' })
  productId!: number;

  @IsNumber()
  @IsPositive({ message: 'Quantity must be more than cero' })
  @Min(1, { message: 'You must add one product at least' })
  quantity!: number;
}