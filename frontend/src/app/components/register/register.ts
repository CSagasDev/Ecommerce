import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export default class Register {
  user = {
    user: '',
    email: '',
    password: '',
  };

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  register() {
    if (!this.user.user || !this.user.email || !this.user.password) {
      this.errorMessage = 'Por favor, complete todos los campos.';

      return;
    }
    this.authService
      .register(this.user.user, this.user.email, this.user.password)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registro failed:', error);

          if (
            error.status === 400 &&
            error.error?.message === 'El correo ya está en uso'
          ) {
            alert('Este correo ya está en uso. Por favor, utiliza otro.');
          } else {
            alert('Revise los datos ingresados. Por favor, intente de nuevo.');
          }
        },
      });
  }
}
