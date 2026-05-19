import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService, CartItem } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart-view',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.css'
})
export class CartViewComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  private cartSubscription!: Subscription;

  constructor(
    private readonly cartService: CartService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    
    this.cartSubscription = this.cartService.cartItems$.subscribe({
      next: (items) => {
        this.cartItems = items;
        this.calculateTotal();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  calculateTotal(): void {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  onRemoveItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  onCheckout(): void {
    alert('Tu pedido ha sido procesado.');
    this.cartService.clearCart();
    this.router.navigate(['/products']);
  }
}