import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from '../products/product.entity';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int', default: 1 })
  quantity!: number;

  // Muchos ítems pertenecen a un mismo Carrito principal
  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id' })
  cart!: Cart;

  // Muchos ítems pueden hacer referencia al mismo Producto base
  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product!: Product;
}