import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CartService } from './cart.service';
import { GetUserId } from 'src/auth/decorators/user-id.decorator';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {

    constructor(private readonly cartService: CartService){}

    @Get()
    async getCart(@GetUserId() userId: number){
        return await this.cartService.getCart(userId);
    }

    @Post('item')
    async addToCart(
        @GetUserId() userId: number,
        @Body() addToCartDto: AddToCartDto,
    ){
        return await this.cartService.addToCart(userId, addToCartDto)
    }

    @Delete('item/:id')
    async removeItem(
        @GetUserId() userId: number,
        @Param('id', ParseIntPipe) itemId: number,
    ){
        return await this.cartService.removeItem(userId, itemId);
    }
}
