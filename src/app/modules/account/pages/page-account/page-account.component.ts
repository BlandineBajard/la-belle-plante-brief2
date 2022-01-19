import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-page-account',
  templateUrl: './page-account.component.html',
  styleUrls: ['./page-account.component.scss']
})
export class PageAccountComponent implements OnInit {
public userInfo: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
 this.userInfo = this.initForm();

  this.authService.getConnectedUserInfo()?.subscribe(
        (user: User) => {
        this.userInfo = this.initForm(user);
      }
    )

  }

  ngOnInit(): void {
  }

  private initForm(user?: User): FormGroup {
    return this.fb.group({
      firstName: [user ? user.firstName : ''],
      lastName: [user ? user.lastName : ''],
      email: [user ? user.email : '']
    })
  }

}
