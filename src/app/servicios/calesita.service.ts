import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Calesita } from '../models/calesita';

/* Un decorador que le dice a Angular que este servicio debe ser creado por el inyector de la aplicación raíz. */
@Injectable({
/* Indicar a Angular que este servicio debe ser creado por el inyector de la aplicación raíz. */
   providedIn: 'root'
})
export class CalesitaService {
  private calesitaCollection:AngularFirestoreCollection<Calesita>;
 
  constructor(/* Creating a reference to the database. */
  private db: AngularFirestore) {
/* Creating a reference to the collection calesita. */
    this.calesitaCollection = db.collection('calesita');
  }

  /**
   Devuelve un observable de la colección calesita, que es una lista de documentos, cada uno de los cuales es una calesita
   */
  obtenerCalesita() {
    // El método devuelve un observable de la colección de documentos en la colección calesita.
    return this.calesitaCollection.snapshotChanges().
    pipe(map((action) => action.map((a) => a.payload.doc.data())));
  }

  /**
   * Crea un nuevo documento en la colección de calesitas, con los datos de la nueva calesita y la url de la imagen
   * @returns Una promesa que resolverá o rechazará según el resultado de la operación.
   */
  creatCalesita(nuevaCalesita: Calesita, url: string) {
    return new Promise(async (resolve, reject) => {
      try {
/* Creando una identificación única para el documento. */
        const id = this.db.createId();
        nuevaCalesita.idcalesita = id;
        nuevaCalesita.imagen = url
        const resultado = await this.calesitaCollection.doc(id).set(nuevaCalesita);
        resolve(resultado);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   *  Toma una identificación y un nuevo objeto, y actualiza el documento con esa identificación con el nuevo objeto
   */
  modificarCalesita(idcalesita: string, nuevaData: Calesita) {
    return this.db.collection('calesita').doc(idcalesita)./* Updating the document with the new data. */
    update(nuevaData);
  }


  /**
  Elimina un documento de la colección
   */
  eliminarCalesita(idcalesita: string) {
    return new Promise((resolve, reject) => {
      try {
        const resp = this.calesitaCollection.doc(idcalesita).delete();
        resolve(resp);
      } catch (error) {
        reject(error);
      }
    });
  }
}
