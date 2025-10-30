import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { Users } from '../../../interfaces/users';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.admin.html',
  styleUrl: './users.admin.css'
})

export class Usersadmin implements OnInit {

private _usersService = inject(UsersService);

allUsers: Users[] = [];

showAllUsers() {
  this._usersService.getUsers().subscribe({
    next: (res: any) => {
      this.allUsers = res.data;
    },
    error: (error: any) => {
      console.error( error);
    }
  });

}
ngOnInit(): void {
  this.showAllUsers();  
 }

deleteUsersById (id: string) {
  
  this._usersService.deleteOwnAccount(id).subscribe({
    next: (res: any) => {
      console.log('Usuario eliminado', res);
      this.showAllUsers(); // Refrescar la lista de usuarios después de eliminar
    },
    error: (error: any) => {
      console.error('Error al eliminar el usuario', error);
    }
  });

} 
}