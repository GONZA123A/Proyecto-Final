import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginWithGoogleService {

  constructor(private auth: AngularFireAuth, private cookie: CookieService) { }

  /* Crea un nuevo objeto GoogleAuthProvider, luego inicia sesión con una ventana emergente y luego se suscribe a 
   el authState, luego obtiene el idToken, luego establece el idToken en la cookie
   */
  async loginWithGoogle() {
    let referenceProvider = new firebase.auth.GoogleAuthProvider();
    await this.auth.signInWithPopup(referenceProvider);
    this.auth.authState.subscribe(
      async user => {
        await user?.getIdToken()
          .then(
            token => {
              this.cookie.set("idToken", token)
            }
          )
          .catch(
            error => {
              console.error("Ocurrió un error: ", error)
            }
          )
      }
    )
  }

  /* La función obtiene el token del usuario del servicio de autenticación de Firebase  */
  getUser() {
    this.auth.authState.subscribe(
      async user => {
        let token = await user?.getIdToken()
        console.log(token)
      }
    )
  }

  /* Llama a la función signOut() del servicio de autenticación y luego elimina la cookie idToken */
  logOut() {
    this.auth.signOut().then(
      () => {
        this.cookie.delete("idToken");
      }
    )
  }

}