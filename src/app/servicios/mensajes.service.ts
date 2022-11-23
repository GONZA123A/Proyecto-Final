import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { map } from 'rxjs/operators';
import { Mensaje } from '../models/mensaje';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  private mensajeCollection : AngularFirestoreCollection<Mensaje>


  constructor(private db: AngularFirestore) {
    this.mensajeCollection = db.collection('mensajes')
   }

   obtenerMensaje() {
    return this.mensajeCollection.snapshotChanges().
      pipe(map(action => action.map(a => a.payload.doc.data())))
  }

  creatMensaje(nuevoMensaje: Mensaje) {
    return new Promise(async(resolve, reject) => {
      try {
        const id = this.db.createId();
        nuevoMensaje.idMensaje = id;
        //se guarda en variable
        const resultado =await this.mensajeCollection.doc(id).set(nuevoMensaje);
        resolve(resultado)
      }
      catch (error) {
        reject(error)
      }
    })

}
}