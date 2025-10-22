import { Navbar } from './components/navbar/navbar';
import { Zen } from './components/zen/zen';
import { Footer } from './components/footer/footer';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginService } from './services/login.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Zen, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  private _loginService = inject(LoginService);

  isVisible : boolean = this._loginService.isAdmin();

}
