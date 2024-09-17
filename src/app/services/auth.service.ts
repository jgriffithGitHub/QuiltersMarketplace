import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:5000/api/auth'; 
  
  constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient) {}

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
		// It works but it's clearly a bad idea. There's definitey something wrong here
		const tmpData : string = JSON.stringify(response);
		const tmpData2 = JSON.parse(tmpData);
		const token = tmpData2.token;
		if(this.document.defaultView)
		{
		  const localStorage = this.document.defaultView?.localStorage;
		  if(localStorage)
		    localStorage.setItem('token', token);
		}
      })
    );
  }

  // Log out the current user
  logout() {
	if(this.document.defaultView)
	{
	  const localStorage = this.document.defaultView?.localStorage;
	  if(localStorage)
        localStorage.removeItem('token');
	}
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    if(this.document.defaultView)
	{
	  const localStorage = this.document.defaultView?.localStorage;
      if(localStorage)
        return (localStorage) ? !!localStorage.getItem('token') : false;
    }
    return false;
  }

  // Get the current user's token
  getToken(): string | null {
    if(this.document.defaultView)
    {
      const localStorage = this.document.defaultView?.localStorage;
      if(localStorage)
        return localStorage.getItem('token');
    }
		
    return null;
  }
}
