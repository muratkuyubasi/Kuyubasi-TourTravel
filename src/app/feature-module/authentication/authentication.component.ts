import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
public routes = routes
}
