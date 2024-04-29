import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/authservice';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  public routes = routes;
  form = new FormGroup({
    email: new FormControl('admin@dreamguys.in', [
      Validators.email,
      Validators.required,
    ]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(private router: Router, private auth: AuthService) {}
  forgotPassword() {
    if (this.form.valid) {
      this.auth.forgotpassword();
    }
  }
  direction() {
    if (this.form.valid) this.router.navigate([routes.resetPassword]);
  }
}
