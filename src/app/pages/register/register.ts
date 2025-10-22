import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Users } from '../../interfaces/users';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  private _Register = inject (UsersService);
  private _router = inject (Router);

  registerForm = new FormGroup ({
    fullname: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]),
    img: new FormControl('', [Validators.required]),
    bio: new FormControl<string>(''),
    interest: new FormControl<string>(''),
  })



handleSubmit() {
  const registerData: Users = {
    _id : '',
    fullname : this.registerForm.value.fullname || '',
    username : this.registerForm.value.username || '',
    email : this.registerForm.value.email || '',
    password : this.registerForm.value.password || '',
    role : "user",  
    img : this.registerForm.value.img || '',
    bio : this.registerForm.value.bio || '',
    interest : this.registerForm.value.interest || '',
  }

this._Register.createUser(registerData).subscribe({
    next: (response: any) => {
      console.log('Registro exitoso:', response);
      if(response) {
        alert('Registro exitoso, por favor inicie sesión');
        this._router.navigate(['/login']);
      }
    },
    error: (error: any) => {
      console.error('Error en el registro:', error);
    }
  });
}
  };
