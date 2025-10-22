import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

export const authGGuard: CanActivateFn = (route, state) => {
  const _loginService = inject(LoginService);
  const _router = inject(Router);

  if (!_loginService.isLoggedIn() || !_loginService.isAdmin()) {
    alert('Acceso denegado. Debes iniciar sesión como administrador para acceder a esta sección.');
    _router.navigate(['/login']);
    return false;
  }
  return true;
};
