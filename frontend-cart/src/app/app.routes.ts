import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { CartViewComponent } from './pages/cart/cart-view/cart-view.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'cart', component: CartViewComponent },


 
  { path: '**', redirectTo: 'login' }
];
