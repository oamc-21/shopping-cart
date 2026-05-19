import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../users/users.entity';
import { CartItem } from './cart-item.entity';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  id!: number;

  // relacion 1 a 1 con el uduario: Un usuario tiene un unico carrito, un carrito pertenece a un unico usuario
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  // relacion 1 a muchos con los items. un carrito puede contener multiples productos agregados
  @OneToMany(() => CartItem, (item) => item.cart, { cascade: true })
  items!: CartItem[];
}