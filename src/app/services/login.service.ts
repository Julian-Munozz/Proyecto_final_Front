import { LoginInterface } from './../interfaces/login.interface';
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _httpClient = inject(HttpClient);
  private _router = inject(Router);
  private apiUrl = environment.appUrl;
  isLogedSignal = signal<boolean>  (false);
  isAdminSignal = signal<boolean>  (false);

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
      decodedToken.admin === true ? this.isAdminSignal.set(true) : this.isAdminSignal.set(false);
      return decodedToken.admin === true ? true : false;
    }
    else {
      this.isAdminSignal.set(false)
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
    if (this.isLoggedIn()){
    localStorage.removeItem('token');
     Swal.fire({
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then(()=>{
      this.isLogedSignal.set(false)
      this.isAdminSignal.set(false)
      this._router.navigate(['/login']);
    })
    } else{
      Swal.fire({
            title: 'No has iniciado sesión',
            text: 'No se ha iniciado sesión.',
            icon: 'info',
            confirmButtonText: 'Aceptar'
          });
    }
  }

isLoggedIn(){
    this.getToken() ? this.isLogedSignal.set(true) : this.isLogedSignal.set(false); 
    return this.getToken() ? true : false;
}

}

  
