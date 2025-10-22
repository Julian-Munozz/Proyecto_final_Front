import { LoginInterface } from './../interfaces/login.interface';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _httpClient = inject(HttpClient);
  private _router = inject(Router);
  private apiUrl = environment.appUrl;

  login (credentialsToLogin: LoginInterface) {
    return this._httpClient.post(this.apiUrl + '/login', credentialsToLogin);
  }
// verificación del token y el rol 
  getToken() {
    return localStorage.getItem('token');
  }

  isAdmin() {
    const token = this.getToken();
    if (token) {
      const decodedToken : any = jwtDecode(token);
      return decodedToken.admin === true ? true : false;
    }
    else {
      console.log('No se encontró el token');
      return false;
    }
  }

  redirectTo (){
    if (this.isAdmin()) {
      this._router.navigate(['/admin']);
    }
    else{
      this._router.navigate(['/']);
    }
  }


  logout() {
    localStorage.removeItem('token');
    alert('Sesión cerrada'); 
    this._router.navigate(['/login']);
  }

isLoggedIn(){
    return this.getToken() ? true : false;
}

}

  
