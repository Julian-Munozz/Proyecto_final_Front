import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {



  private _loginService = inject(LoginService);

  isVisible : boolean = this._loginService.isAdmin() && this._loginService.isLoggedIn();

}
