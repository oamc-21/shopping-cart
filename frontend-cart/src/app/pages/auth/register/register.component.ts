import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {
  
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

 onSubmit(): void {
  if (this.registerForm.invalid) return;

  this.authService.register(this.registerForm.value).subscribe({
    next: (res) => {
      
      this.successMessage = 'Cuenta creada con exito! Redirigiéndote al inicio de sesión...';
      this.errorMessage = '';
      this.cdr.detectChanges();

   
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2500); 
    },
    error: (err) => {
      console.error('Error en el registro:', err);

      this.errorMessage = err.error?.message || 'No se pudo crear la cuenta.';
      this.successMessage = '';
      this.cdr.detectChanges();
    }
  });
}
}