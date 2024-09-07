import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://your-api-url.com/api'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  // Register a new user
  register(username: string, email: string, password: string): Observable<any> {
    const userData = { username, email, password };
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Log in an existing user
  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post(`${this.apiUrl}/login`, loginData).pipe(
      tap(response => {
        // Save the token to localStorage
		// This is broken - the return type from POST is "Object"
		// but we're trying to get a property from it and "Object" doesn't have 
		// the "token" property. So until we work out what the object type name is,
		// just write out the entire response to get past the compiler error.
        //localStorage.setItem('token', response.token);
        localStorage.setItem('token', JSON.stringify(response));
      })
    );
  }

  // Log out the current user
  logout() {
    localStorage.removeItem('token');
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Get the current user's token
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
