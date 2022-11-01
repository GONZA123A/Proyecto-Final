import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { map } from 'rxjs';
import { Usuario } from '../models/usuario';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  //declaramos usuariosCollection a privado
  private usuariosCollection: AngularFirestoreCollection<Usuario>
  //lo conectamos con la base de datos
  constructor(private db:AngularFirestore) { 
    this.usuariosCollection = db.collection('Usuarios');
  }
  //obtenemos los usuarios de la base de datos
  obtenerUsuarios(){
    return this.usuariosCollection.snapshotChanges().pipe(map(action=>action.map(a=>a.payload.doc.data())))
  }
}
