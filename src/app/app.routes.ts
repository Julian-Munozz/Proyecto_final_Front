import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Admin } from './pages/admin/admin';
import { Login } from './pages/login/login';
import { NotFound } from './pages/not-found/not-found';
import { Register } from './pages/register/register';
import { Habits } from './pages/habits/habits';
import { Beyond } from './pages/beyond/beyond';

export const routes: Routes = [
    { path: '', component: Home, title: 'Home' },
    { path: 'admin', component: Admin, title: 'Dashboard' },
    { path: 'login', component: Login, title: 'Login' },
    { path: 'habits', component: Habits, title: 'Hábitos' },
    { path: 'register', component: Register, title: 'Registro' },
    { path: 'beyond', component: Beyond, title: 'Beyond' },
    { path: '**', component: NotFound, title: '404' }
];
