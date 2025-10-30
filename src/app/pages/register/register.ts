import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Users } from '../../interfaces/users';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  private _Register = inject (UsersService);
  private _router = inject (Router);
  selectedFile: File | null = null;

  registerForm = new FormGroup ({
    fullname: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]),
    img: new FormControl('', [Validators.required]),
  })

 fileChange (event: any) {
     const input = event.target.files[0];
     if (input){
       this.selectedFile = input;
       console.log('Archivo seleccionado:', this.selectedFile);
     }

 }

handleSubmit() {
  const registerData: FormData = new FormData();


  registerData.append(  '_id' , '')
  registerData.append(  'fullName' , this.registerForm.value.fullname || '')
  registerData.append(  'userName' , this.registerForm.value.username || '')
  registerData.append(  'email' , this.registerForm.value.email || '')
  registerData.append(  'password' , this.registerForm.value.password || '')
  registerData.append(  'role' , "user")
  registerData.append(  'img' , this.selectedFile || '')


this._Register.createUser(registerData).subscribe({
    next: (response: any) => {
      console.log('Registro exitoso:', response);
      if(response) {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: response.mensaje || 'Registro completado con éxito.'
        }).then(() => {
          this._router.navigate(['/login']);
        })
      }
    },
    error: (error: any) => {
      console.error('Error en el registro:', error);
    }
  });
}
  };
