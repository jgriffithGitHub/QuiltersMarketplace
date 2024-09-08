import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
})

export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(e : Event) {
    this.authService.register(this.username, this.email, this.password).subscribe({
      next: (response) => {
        // Navigate to login page after successful registration
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration error:', error);
        alert('Registration failed. Please try again.');
      }
    });
  }
}