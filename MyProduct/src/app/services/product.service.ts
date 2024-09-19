import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from './../models/product'; 
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.api_base_url;
  private httpOptions = {
    headers: new HttpHeaders({
      'x-apikey': environment.api_key
    })
  };

  constructor(private http: HttpClient) {}

  // Get all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, this.httpOptions)
      .pipe(
        catchError(this.handleError) 
      );
  }

  // Get product by ID
  getProductById(id: string): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Product>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError) // Handle errors
      );
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server error: ${error.status} - ${error.message}`;
    }
    
    // Log the error to the console (optional)
    console.error(errorMessage);

    // Return a user-friendly message
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
