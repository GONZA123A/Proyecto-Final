import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from './servicios/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private servicioUsuario: UsuariosService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    /* Comprobando si el usuario ha iniciado sesión. Si es así, devuelve verdadero, si no, redirige a la página de inicio de sesión.
    y devuelve falso. */
    if (this.servicioUsuario.estaLogueado()) {
      return true;

    }
    else {
      this.router.navigateByUrl("login")
      return false
    }
  }
}
