import { Habits } from '../interfaces/habits';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HabitsService {

  // inyección de dependencias 
  private _httpClient = inject(HttpClient);

  // Definir ruta de acceso a la API, se puede colocar el api de terceros 
  private apiUrl = `${environment.appUrl}/posts`;

  // Métodos para hacer las peticiones
  createHabit(habitData: Habits | FormData) {
    return this._httpClient.post(this.apiUrl, habitData);
  }

  // Obtener todos los hábitos
  getHabits() {
    return this._httpClient.get(this.apiUrl);
  }

  // Obtener hábitos por nombre de usuario
  getHabitsByUserName(userName: string) {
    return this._httpClient.get(this.apiUrl + '/user/' + userName);
  }

  // Actualizar hábito por ID
  updateHabitById(id: string, habitData: Habits | FormData) {
    return this._httpClient.put(this.apiUrl + '/' + id, habitData);
  }

  // Eliminar hábito por ID
  deleteHabitById(id: string) {
    return this._httpClient.delete(this.apiUrl + '/' + id);
  }

}
