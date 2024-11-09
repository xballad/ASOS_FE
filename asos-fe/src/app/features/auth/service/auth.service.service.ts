import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrlRegister = 'http://localhost:8000/api/register'; // env treba dat 
  private apiUrlLogin = 'http://localhost:8000/api/login'; // env
  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(this.apiUrlRegister, userData);
  }

  login(loginData: any): Observable<any> {
    return this.http.post(this.apiUrlLogin, loginData);
  }
}
