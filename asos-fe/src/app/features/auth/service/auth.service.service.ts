import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrlRegister = 'http://localhost:8000/api/register'; // env treba dat 
  private apiUrlLogin = 'http://localhost:8000/api/login'; // env
  constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient) {}

  private tokenKey = 'authToken';
  private userEmail: string | null = null;



  getUserEmail(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken?.sub || null; // Return the email (sub) field from the token
    }
    return null;
  }

  register(userData: any): Observable<any> {
    return this.http.post(this.apiUrlRegister, userData);
  }

  login(loginData: { email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrlLogin, loginData).pipe(
      tap((response: any) => {
        const localStorage = this.document.defaultView?.localStorage;

        if (localStorage) {
          localStorage.setItem(this.tokenKey, response.access_token);
        }
      })
    );
  }

  getToken(): string | null {
    const localStorage = this.document.defaultView?.localStorage;
    return localStorage ? localStorage.getItem(this.tokenKey) : null;
  }

  
}
