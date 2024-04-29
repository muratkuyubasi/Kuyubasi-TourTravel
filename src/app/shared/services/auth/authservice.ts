import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '../../routes/routes';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private router: Router) {}

  public signin(): void {
    localStorage.setItem('authenticated', 'true');
    this.router.navigate([routes.home]);
  }
  
  public signup(): void {
    localStorage.setItem('authenticated', 'true');
    this.router.navigate([routes.login]);
  }
  public forgotpassword(): void {
    localStorage.setItem('authenticated', 'true');
    this.router.navigate([routes.resetPassword]);
  }
}

