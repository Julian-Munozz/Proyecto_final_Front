import { Component, inject, computed } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { RouterLink, RouterLinkActive } from "@angular/router";


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {



  private _loginService = inject(LoginService);


  isLogged = computed(()=> this._loginService.isLogedSignal())
  
  
  isAdmin = computed(()=> this._loginService.isAdminSignal())

  
  logout() {
    this._loginService.logout();
   
  }

dropDownMenu = false;

optionsSubmenu() {
  this.dropDownMenu = !this.dropDownMenu;
  console.log('Estado del menú:', this.dropDownMenu);
}

}
