import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
})

export class LoginComponent {
  email: string = '';
  password: string = '';

constructor(private authService: AuthService, private router: Router) {}

  onLogin(e : Event) {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        // Navigate to the user's collection page after login
        this.router.navigate(['/collection']);
      },
      error: (error) => {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
      }
    });
  }
}
