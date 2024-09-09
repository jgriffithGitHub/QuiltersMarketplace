import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:5000/api/auth'; // Replace with your actual backend URL
  private doc;
  
  constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient) {
    this.doc = document;
  }

  // Register a new user
  register(username: string, email: string, password: string): Observable<any> {
	console.log("register called");
    const userData = { username, email, password };
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Log in an existing user
  login(email: string, password: string): Observable<any> {
 	console.log("login called");
   const loginData = { email, password };
    return this.http.post(`${this.apiUrl}/login`, loginData).pipe(
      tap(response => {
        // Save the token to localStorage
		// This is broken - the return type from POST is "Object"
		// but we're trying to get a property from it and "Object" doesn't have 
		// the "token" property. So until we work out what the object type name is,
		// just write out the entire response to get past the compiler error.
        //localStorage.setItem('token', response.token);
		if(this.doc.defaultView)
		{
		  const localStorage = this.doc.defaultView?.localStorage;
		  console.log("Response = " + response);
		  if(localStorage)
		    localStorage.setItem('token', JSON.stringify(response));
		}
      })
    );
  }

  // Log out the current user
  logout() {
	if(this.doc.defaultView)
	{
	  const localStorage = this.doc.defaultView?.localStorage;
	  if(localStorage)
        localStorage.removeItem('token');
	}
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    if(this.doc.defaultView)
	{
	  const localStorage = this.doc.defaultView?.localStorage;
      if(localStorage)
        return (localStorage) ? !!localStorage.getItem('token') : false;
    }
    return false;
  }

  // Get the current user's token
  getToken(): string | null {
    if(this.doc.defaultView)
    {
      const localStorage = this.doc.defaultView?.localStorage;
      if(localStorage)
        return localStorage.getItem('token');
    }
		
    return null;
  }
}
