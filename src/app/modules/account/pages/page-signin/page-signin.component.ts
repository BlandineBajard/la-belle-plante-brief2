import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-page-sign-in',
  templateUrl: './page-signin.component.html',
  styleUrls: ['./page-signin.component.scss']
})
export class PageSignInComponent implements OnInit {
  public errorForm:boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.errorForm=false;
   }

  ngOnInit(): void {
  }

  public onSubmit(submittedForm: any):void{
   const email = submittedForm.form.value['email'];
    const password = submittedForm.form.value['password'];
    if(email !== '' && password !== '') {
      this.authService.signin(email, password).subscribe(
        resp => {
          console.log('Component Page Signon: ', resp);
            this.router.navigate(['account/user']);
        }
      )
    } else {
      // afficher une erreur à l'utilisateur
      this.errorForm=true;
    }
  }

}
