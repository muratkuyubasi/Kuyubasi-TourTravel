import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { routes } from 'src/app/shared/routes/routes';
import { AuthService } from 'src/app/shared/services/auth/authservice';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public routes = routes;
  public show_password = true;

  form = new FormGroup({
    email: new FormControl('admin@dreamguys.in', [
      Validators.email,
      Validators.required,
    ]),
    password: new FormControl('123456', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(private auth: AuthService) {}

  signin() {
    if (this.form.valid) {
      this.auth.signin();
    }
  }
  togglePassword() {
    this.show_password = !this.show_password;
  }
  ngOnInit(): void {
    if (localStorage.getItem('authenticated')) {
      localStorage.removeItem('authenticated');
    }
  }
}
