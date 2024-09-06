import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  onRegister() {
    // Call AuthService to handle registration (to be implemented)
    console.log('Registering with', this.username, this.email, this.password);
  }
}
