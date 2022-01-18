import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string;
  private tokenKey: string;

  constructor(private http: HttpClient) {
    // On se sert des variables d'environnement de notre application
    this.apiUrl = environment.apiUrl;
    this.tokenKey = environment.tokenKey;
  }

  signup(newUser: User): Observable<any> {
    //  const body = {
    //    firstName: firstName,
    //   lastName: lastName,
    //    email: email,
    //    password: password
    //  };

    return this.http.post(`${this.apiUrl}/register`, newUser);
  }

  signin(email:string, password:string): Observable<any>{
  const body = {
    email: email,
    password: password
    };

    // - pour pouvoir stocker dans le local-storage notre access token
    // sous la clé "TOKEN-LBP"

    return this.http.post(`${this.apiUrl}/login`, body).pipe(
      map((x:any) => {
      console.log('Service :', x.accessToken);
      localStorage.setItem(this.tokenKey, x.accessToken);  // pour pouvoir stocker dans le local-storage notre access token
    return x;                                             // sous la clé "TOKEN-LBP" (cf environnements.ts)
    })
    );

  }

}
