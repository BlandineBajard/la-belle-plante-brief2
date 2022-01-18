import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    // On se sert des variables d'environnement de notre application
    this.apiUrl = environment.apiUrl;
  }

  signup(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      password: password,
    };

    console.log('Mon body : ', body);

    return this.http.post(`${this.apiUrl}/register`, body);
  }

  signin(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      password: password,
    };

    console.log('Mon body : ', body);

    return this.http.post(`${this.apiUrl}/login`, body);
  }

  forgotPassword(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      password: password,
    };

    console.log('Mon body : ', body);

    return this.http.post(`${this.apiUrl}/forgot-psw`, body);
  }
}
