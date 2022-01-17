import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { PageSigninComponent } from './pages/page-signin/page-signin.component';
import { PageSignupComponent } from './pages/page-signup/page-signup.component';
import { PageForgotPasswordComponent } from './pages/page-forgot-password/page-forgot-password.component';
import { PageResetPasswordComponent } from './pages/page-reset-password/page-reset-password.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PageSigninComponent,
    PageSignupComponent,
    PageForgotPasswordComponent,
    PageResetPasswordComponent,
  ],
  imports: [CommonModule, AccountRoutingModule, FormsModule],
})
export class AccountModule {}
