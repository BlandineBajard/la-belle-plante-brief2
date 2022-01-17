import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-page-signup',
  templateUrl: './page-signup.component.html',
  styleUrls: ['./page-signup.component.scss'],
})
export class PageSignupComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  public onSubmit(objectForm: any): void {
    console.log('value : ', objectForm.form.value);
    console.log('form : ', objectForm);
    const email = objectForm.form.value.email;
    const password = objectForm.form.value.password;

    this.authService
      .signup(email, password)
      .subscribe((resp) => console.log(resp));
  }
}
