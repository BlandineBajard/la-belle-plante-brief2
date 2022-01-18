import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
private tokenKey: string;
constructor(private router: Router){
  this.tokenKey = environment.tokenKey;
}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem(this.tokenKey);

      if(token) {
        console.log("C'est ok ! ")
        return true;
      } else {
        console.log("You shall not pass !!!!")
        this.router.navigate(['account/signin']);
        return false;
  }
}
}
