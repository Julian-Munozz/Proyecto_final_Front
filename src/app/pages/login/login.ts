import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginInterface } from '../../interfaces/login.interface';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {

  private _loginService = inject(LoginService);

  loginForm = new FormGroup({
    email: new FormControl, //('', [Validators.required, Validators.email, Validators.maxLength(50), Validators.minLength(10)]),
    password: new FormControl //('', [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]),
  })

  handleSubmit() {
    if (this.loginForm.invalid) {
      console.log("estoy con credenciales invalidas");
      this.loginForm.markAllAsTouched();
      return;
    }

    const credentials: LoginInterface = {
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || ''
    };
    console.log(credentials);

    this._loginService.login(credentials).subscribe({
      next: (response: any) => {
        console.log('Login exitoso:', response);
        
        if (response) {
          localStorage.setItem('token', response.token);
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: response.mensaje || 'Has iniciado sesión correctamente.'
          }).then (()=> {
            this._loginService.redirectTo();
          })
        }
      },
      error: (error: any) => {
        console.error('Error en el login:', error);
        Swal.fire({
          icon: 'error',
          title: 'Fallo al iniciar sesión',
          text: error.error.mensaje || 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.'
        });
      }
    });
  }
}
