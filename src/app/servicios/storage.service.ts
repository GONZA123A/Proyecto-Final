import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, ref, UploadResult, uploadString } from "firebase/storage";


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private respuesta: UploadResult;
  //obtiene la referencia del storage(en este caso lo obtenemos con linea getStorege()) 
  private storage = getStorage();

  constructor() { }

  //el ref recibe la url de la imagen y la instancia
  /**
   * It takes a string, an image, and a route as parameters, and returns a promise
   * @param {string} nombre - string, imagen: any, ruta: string
   * @param {any} imagen - any: This is the image that you want to upload.
   * @param {string} ruta - string: The path where the image will be stored in the storage.
   * @returns The image is being returned.
   */
  async subirImagen(nombre: string, imagen: any, ruta: string) {
    //posibilidad de error se usa try y catch
    try {
      //da la ruta donde se va a guardar la imagen dentro del storage
      let referenciaImagen = ref(this.storage, ruta + '/' + nombre)
      //creamos la tarea que se encarga de subir la imagen(en este caso usando el metodo uploadString()
      this.respuesta = await uploadString(referenciaImagen, imagen, 'data_url')
        //rescibe una respuesta
        .then(resp => {
          return resp;
        })
      //lo devuelve

      return this.respuesta;
    }
    catch (error) {
      console.log(error)
      return this.respuesta
    }

  }
  //obtiene la url de la iamgen subida
  obtenerUrlImage(respuesta: UploadResult) {
    return getDownloadURL(respuesta.ref)
  }
}
