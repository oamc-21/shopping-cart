import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { ProductsService } from 'src/products/products.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
        @InjectRepository(CartItem)
        private readonly cartItemRepository: Repository<CartItem>,
        private readonly productsService: ProductsService,
    ){}

    async getCart(userId: number): Promise<Cart>{
        let cart = await this.cartRepository.findOne({
            where: {user: {id: userId}},
            relations: {items: {product: true}}
        });

        if(!cart){
            cart = this.cartRepository.create({user: {id: userId}, items: []});
            cart = await this.cartRepository.save(cart);
        }
        return cart;
    }

    async addToCart(userId: number, addToCartDto: AddToCartDto): Promise<Cart>{
        const {productId, quantity} = addToCartDto;
        const product = await this.productsService.findOne(productId);
        const cart = await this.getCart(userId);
        const existingItem = cart.items.find((item) => item.product.id === product.id);

        if(existingItem){
            existingItem.quantity += quantity;
            await this.cartItemRepository.save(existingItem);
        }else{
            const newItem = this.cartItemRepository.create({
                cart,
                product,
                quantity
            });
            await this.cartItemRepository.save(newItem);
        }
        return await this.getCart(userId);
    }
    

    async removeItem(userId: number, itemId: number): Promise<Cart>{
        const cart = await this.getCart(userId);
        const itemToRemove = await this.cartItemRepository.findOne({
            where: {id: itemId, cart: {id: cart.id}},
        })     
        
        if(!itemToRemove) throw new NotFoundException(`Item not found`);
        await this.cartItemRepository.remove(itemToRemove);
        return await this.getCart(userId);
    }
}
