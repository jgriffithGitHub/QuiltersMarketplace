import { Injectable, SkipSelf } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SwatchService {
  private apiUrl = 'http://127.0.0.1:5000/api/swatches'; 

  constructor(private authService: AuthService, private http: HttpClient) {}

  // Get all swatches for the logged-in user
  getSwatches(): Observable<any[]> {
    let token = (this.authService.getToken() || '');
    let header = new HttpHeaders({
      'Authorization':`Bearer ${token}`
	});
  
    return this.http.get<any[]>(this.apiUrl, {headers:header});
  }

  // Get a specific swatch
  getSwatch(id: string): Observable<any[]> {
    console.log("getSwatch called");
    let token = (this.authService.getToken() || '');
    let header = new HttpHeaders({
      'Authorization':`Bearer ${token}`
	});
	
    return this.http.get<any>(`${this.apiUrl}/${id}`, {headers:header});
  }

  // Create a new swatch
  createSwatch(swatch: any): Observable<any> {
    console.log("createSwatch called -- swatch: " + JSON.stringify(swatch));
    let token = (this.authService.getToken() || '');
    let header = new HttpHeaders({
      'Authorization':`Bearer ${token}`
	});

    return this.http.post<any>(this.apiUrl, swatch, {headers:header});
  }

  // Update an existing swatch
  //updateSwatch(id: string, swatch: any): Observable<any> {
  //  return this.http.put<any>(`${this.apiUrl}/${id}`, swatch);
  updateSwatch(swatch: any): Observable<any> {
    console.log("Updating description: " + swatch.description);
    console.log("Updating quantityUnits: " + swatch.quantityUnits);
    let token = (this.authService.getToken() || '');
    let header = new HttpHeaders({
      'Authorization':`Bearer ${token}`
	});

    return this.http.put<any>(`${this.apiUrl}/${swatch.app_id}`, swatch, {headers:header});
  }

  // Delete a swatch
  deleteSwatch(id: string): Observable<any> {
    let token = (this.authService.getToken() || '');
    let header = new HttpHeaders({
      'Authorization':`Bearer ${token}`
	});

    return this.http.delete<any>(`${this.apiUrl}/${id}`, {headers:header});
  }
}
