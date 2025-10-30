import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Admin } from './pages/admin/admin';
import { Login } from './pages/login/login';
import { NotFound } from './pages/not-found/not-found';
import { Register } from './pages/register/register';
import { HabitsPage } from './pages/habits/habits';
import { Beyond } from './pages/beyond/beyond';
import { Usersadmin } from './pages/admin/users/users.admin';
import { HabitsAdmin } from './pages/admin/habits.admin/habits.admin';
import { authGGuard } from './guards/auth.g-guard';


export const routes: Routes = [
    { path: '', component: Home, title: 'Home' },
    { path: 'admin', 
        component: Admin, 
        title: 'Dashboard',
        canActivate: [authGGuard],
        canActivateChild: [authGGuard],
        children: [
            {path: '', component: Usersadmin},
            {path : 'habits', component: HabitsAdmin}
        ]
     },
    { path: 'login', component: Login, title: 'Login' },
    { path: 'habits', component: HabitsPage, title: 'Hábitos' },
    { path: 'register', component: Register, title: 'Registro' },
    { path: 'beyond', component: Beyond, title: 'Beyond' },
    { path: '**', component: NotFound, title: '404' }
];
