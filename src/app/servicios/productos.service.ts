import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { map } from 'rxjs/operators';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  //referencia de base de dato para que se guarde
  private productosCollection: AngularFirestoreCollection<Producto>

  constructor(private db: AngularFirestore) {
    //creamos una variable para guardarlos 
    this.productosCollection = db.collection('productos')
  }

  obtenerProducto() {
    //retorna=devolver la colecciom y metodo para que se muestre rapido:
    return this.productosCollection.snapshotChanges().
      //el pipe es un operador de urxjs=>operador map retorna el nuevo arreglo->variable accion->
      pipe(map(action => action.map(a => a.payload.doc.data())))
  }

  //funcion de crear un producto
  creatProducto(nuevoProducto: Producto, url: string) {
    //recibe dos datos
    return new Promise(async (resolve, reject) => {
      try {
        const id = this.db.createId();
        nuevoProducto.idproductos = id;
        nuevoProducto.imagen = url

        //se guarda en variable
        const resultado = await this.productosCollection.doc(id).set(nuevoProducto);
        resolve(resultado)
      }
      catch (error) {
        reject(error)
      }
    })
  }
  //modificar
  modificarProducto(idProducto: string, nuevaData: Producto) {
    return this.db.collection('productos').doc(idProducto).update(nuevaData)
  }
  //para eliminar
  eliminarProducto(idProducto: string) {
    //se retorna la promesa
    return new Promise((resolve, reject) => {
      //trycarch para 
      try {
        const resp = this.productosCollection.doc(idProducto).delete()
        resolve(resp)
      }
      catch (error) {
        reject(error)
      }
    })
  }
}