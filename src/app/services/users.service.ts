import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from './../interfaces/users';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // inyección de dependencias 
  private _httpClient = inject(HttpClient);

  // Definir ruta de acceso a la API, se puede colocar el api de terceros 
  private apiUrl = environment.appUrl;

  // Métodos para hacer las peticiones
   getUsers() {
    return this._httpClient.get(this.apiUrl + '/users');
  }

  // Obtener usuario por ID
  getUserById(id: string) {
    return this._httpClient.get(this.apiUrl + '/users/' + id);
  }

  // Crear usuario
  createUser(userToCreate: any) {
    return this._httpClient.post(this.apiUrl + '/users', userToCreate);
  }

  // Actualizar contraseña
  updatePassword(id: string, newPassword: string) {
    return this._httpClient.put(this.apiUrl + '/users/' + id + '/password', { password: newPassword });
  }

  // Actualizar perfil
  updateProfile(id: string, profileData: any) {
    return this._httpClient.put(this.apiUrl + '/users/' + id + '/profile', profileData);
  }

  // Eliminar cuenta propia
  deleteOwnAccount(id: string) {
    return this._httpClient.delete(this.apiUrl + '/users/' + id);
  }
  
}
