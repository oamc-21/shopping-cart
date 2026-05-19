import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem]),
    UsersModule,
    ProductsModule
    
  ]
})
export class CartModule {}
