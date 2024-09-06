import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  onLogin() {
    // Call AuthService to handle login (to be implemented)
    console.log('Logging in with', this.email, this.password);
  }
}
