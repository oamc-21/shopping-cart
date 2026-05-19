import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private readonly cartItemsSubject = new BehaviorSubject<CartItem[]>([]);

  cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();

 
  addToCart(product: any): void {
    const currentItems = this.cartItemsSubject.value;
    
    const existingItemIndex = currentItems.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
    
      currentItems[existingItemIndex].quantity += 1;
    } else {

      currentItems.push({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        quantity: 1
      });
    }

   
    this.cartItemsSubject.next([...currentItems]);
  }


  removeFromCart(productId: number): void {
    const updatedItems = this.cartItemsSubject.value.filter(item => item.id !== productId);
    this.cartItemsSubject.next(updatedItems);
  }


  clearCart(): void {
    this.cartItemsSubject.next([]);
  }
}