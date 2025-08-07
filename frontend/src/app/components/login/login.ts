import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export default class Login {
  user = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}
  login() {
    if (!this.user.email || !this.user.password) {
      alert('Por favor, complete todos los campos.');
      return;
    }
    this.authService.login(this.user.email, this.user.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        localStorage.setItem('token', response.accessToken);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Credenciales incorrectas. Por favor, intente de nuevo.');
      },
    });
  }
}
