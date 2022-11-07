import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Calesita } from '../models/calesita';

@Injectable({
  providedIn: 'root'
})
export class CalesitaService {
  private calesitaCollection: AngularFirestoreCollection <Calesita>;
  
  constructor(private db: AngularFirestore) { 
    this.calesitaCollection = db.collection('calesita');
  }

  obtenerCalesita(){
    return this.calesitaCollection.snapshotChanges().pipe(map((action) => action.map((a) => a.payload.doc.data())));
  }

  creatCalesita(nuevaCalesita: Calesita, url: string){
    return new Promise (async (resolve, reject) =>{
      try {
        const id = this.db.createId();
        nuevaCalesita.idcalesita = id;
        nuevaCalesita.imagen = url

        const resultado = await this.calesitaCollection.doc(id).set(nuevaCalesita);
        resolve(resultado);
      }catch(error){
        reject(error);
      }
    });
  }

  modificarCalesita(idcalesita:string, nuevaData: Calesita){
    return this.db.collection('calesita').doc(idcalesita).update(nuevaData);
  }

  
  eliminarCalesita(idcalesita: string){
    return new Promise((resolve, reject) =>{
      try{
        const resp = this.calesitaCollection.doc(idcalesita).delete();
        resolve(resp);
      }catch(error){
        reject(error);
      }
    });
  }
}
