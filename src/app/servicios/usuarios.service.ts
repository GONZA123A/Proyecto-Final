import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { map } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Usuarios } from '../models/usuario';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private isLoged = false;

  //declaramos usuariosCollection a privado
  private usuariosCollection: AngularFirestoreCollection<Usuarios>
  //lo conectamos con la base de datos
  constructor(private db:AngularFirestore) { 
    this.usuariosCollection = db.collection('usuarios');
  }
  //obtenemos los usuarios de la base de datos
  obtenerUsuarios(){
    return this.usuariosCollection.snapshotChanges().pipe(map(action=>action.map(a=>a.payload.doc.data())))
  }
  login(form:FormGroup,usuariosCol:Usuarios[]){
    let texto = "No Inicio"
    if(form.valid){
      usuariosCol.forEach(
        usuario=>{
          console.log("input: ",form.value.username)
          console.log("Bbdd: ",usuario.usuario)

          if(form.value.username == usuario.usuario){
            
            if(form.value.password == usuario.contrasena){
              this.isLoged = true
              texto = "Inicio Sesion"
            }
          }
        }
      )
    alert(texto)
    }
  }
  estaLoguedo(){
    return this.isLoged
  }
}