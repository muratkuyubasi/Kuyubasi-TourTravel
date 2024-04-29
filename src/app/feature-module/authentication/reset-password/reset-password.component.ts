import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/authservice';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  public routes = routes;
  public show_password1: boolean = true;
  public show_password2: boolean = true;
  public confirmPassword: boolean = true;

  form = new FormGroup({
    password: new FormControl('', [Validators.required]),
    confirmpassword: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }
  constructor(private auth: AuthService) {}

  resetpassword() {
    if (
      this.form.value.password === this.form.value.confirmpassword &&
      this.form.valid
    ) {
      this.confirmPassword = true;
      this.auth.signin();
    } else {
      this.confirmPassword = false;
      this.auth.forgotpassword();
    }
  }
}
