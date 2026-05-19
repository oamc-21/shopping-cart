import { IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';

export class AddToCartDto {
  @IsNumber()
  @IsNotEmpty({ message: 'El ID del producto es obligatorio' })
  productId!: number;

  @IsNumber()
  @IsPositive({ message: 'La cantidad debe ser mayor a cero' })
  @Min(1, { message: 'Debes añadir al menos 1 producto' })
  quantity!: number;
}