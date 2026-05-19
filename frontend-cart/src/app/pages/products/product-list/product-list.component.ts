import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../core/services/product.service';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service'; 

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: any[] = [];
  errorMessage: string = '';
  
  
  cartCount: number = 0;
  private cartSubscription!: Subscription;

  constructor(
    private readonly productService: ProductService,
    private readonly authService: AuthService,
    private readonly cartService: CartService, 
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();

    
    this.cartSubscription = this.cartService.cartItems$.subscribe({
      next: (items) => {
        
        this.cartCount = items.reduce((total, item) => total + item.quantity, 0);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => { this.products = data; },
      error: (err) => {
        console.error('Error cargando productos:', err);
        this.errorMessage = 'No se pudieron cargar los productos.';
        if (err.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      }
    });
  }

 
  onAddToCart(product: any): void {
    this.cartService.addToCart(product);
  }

  onLogout(): void {
    this.cartService.clearCart(); 
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}