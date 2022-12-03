import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { map } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Usuarios } from '../models/usuario';
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';

import Swal from 'sweetalert2'; //esto es para el alert
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  //el logeado está en falso.
  private isLoged = false;

  //declaramos usuariosCollection a privado
  private usuariosCollection: AngularFirestoreCollection<Usuarios>
  //lo conectamos con la base de datos
  constructor(private db: AngularFirestore, public router: Router, private cookieSevice: CookieService) {
    this.usuariosCollection = db.collection('usuarios');
  }
  //obtenemos los usuarios de la base de datos
  obtenerUsuarios() {
    return this.usuariosCollection.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())))
  }
  //se cumplen condiciones al ingresar el usuario y contraseña
  /**Comprueba si el nombre de usuario y la contraseña son correctos, si lo son, inicia sesión en el usuario y redirige él a la página de administración */
  login(form: FormGroup, usuariosCol: Usuarios[]) {
    let texto = "Ocurrió un error a la hora de ingresar"
    if (form.valid) {
      usuariosCol.forEach(
        usuario => {
          console.log("input: ", form.value.username)
          console.log("Bbdd: ", usuario.usuario)

          if (form.value.username == usuario.usuario) { //si username es igual al nombre de usuario que está en la base de datos
            if (form.value.password == usuario.contrasena) { // y si password es igual a la contraseña que está en la base de datos
              //se logea la persona y hay un ingreso correcto.
              this.isLoged = true
              this.cookieSevice.set("sesionIniciada", this.isLoged.toString())
              Swal.fire({ //es una alerta correcta de sweetalert2.
                position: 'top-end',
                icon: 'success',
                title: 'Se ha iniciado sesión correctamente.',
                showConfirmButton: false,
                timer: 1500
              })
              this.router.navigate(["/admin"]); //se redirige al usuario al admin
            }
          } if (form.value.password !== usuario.contrasena) {
            Swal.fire({ //es una alerta de error de sweetalert2.
              icon: 'error',
              title: 'Oops...',
              text: 'La contraseña es incorrecta',
            })
          } if (form.value.username !== usuario.usuario) {
            Swal.fire({ //es una alerta de error de sweetalert2.
              icon: 'error',
              title: 'Oops...',
              text: 'El usuario es incorrecto',
            })
          } if (form.value.username.valid == " ") {
            if (form.value.password == " ") {
              Swal.fire({ //es una alerta de error de sweetalert2.
                icon: 'error',
                title: 'Oops...',
                text: 'los campos están vacíos',
              })
            }
          }
        }
      )

    }
  }
  /**Comprueba si el usuario está logueado.  */
  estaLogueado() { //se retorna el login
    if (this.cookieSevice.get("sesionIniciada") === "true") {
      this.isLoged = true
    }

    return this.isLoged
  }


  /**
  Establece el valor de la cookie en falso y establece el valor de la variable isLoged en falso. */
  logOut() {
    this.isLoged = false
    this.cookieSevice.set("sesionIniciada", this.isLoged.toString())
  }
}