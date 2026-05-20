import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, Form } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { validate } from '@angular/forms/signals';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',

})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.errorMessage = ''; 

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        setTimeout(()=>{
          this.router.navigate(['/products']);
        }, 50);
        },
      error: (err) => {
        console.log('Error en el servidor', err);
    
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
         
          this.errorMessage = 'El correo electrónico o la contraseña son incorrectos.';
        }
      }
    });
  }
}
