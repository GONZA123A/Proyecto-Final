import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/servicios/productos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/servicios/storage.service';
import { CalesitaService } from 'src/app/servicios/calesita.service';
import { Calesita } from 'src/app/models/calesita';
import Swal from 'sweetalert2'; //esto es una prueba

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  nombre: string;
  coleccionProductos: Producto[] = [];
  coleccionCalesita: Calesita[] = [];


  constructor(private servicioProductos: ProductosService, private storage: StorageService, private servicioCalesita: CalesitaService) { } //se declara en privado 

  ngOnInit(): void {
    this.servicioProductos.obtenerProducto().subscribe((producto) => (this.coleccionProductos = producto));
    this.servicioCalesita.obtenerCalesita().subscribe((calesita) => (this.coleccionCalesita = calesita));
  }

  //se hace un arreglo con formgroup con cada dato que tenga
  producto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    categoria: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    // imagen: new FormControl('', Validators.required),
  });
  //se hace un arreglo con formgroup con cada dato que tenga
  calesita = new FormGroup({
    imagen: new FormControl('', Validators.required),
  });

  //se declara y se declaran sus tipos o valores
  imagen: string;
  imagen1: string;
  imagen2: string; 
  textBoton: string;
  //esto es de producto
  productoSeleccionado: Producto;
  coleccionProducto: Producto[] = [];
  eliminarVisible: boolean = false;
  modalVisible: boolean = false;
  //esto es de calesita
  calesitaSeleccionado: Calesita;
  eliminarVisibleCalesita: boolean = false;
  modalVisibleCalesita: boolean = false;

  //esto es de un alert
  title = 'sweetAlert';//esto es una prueba
  showModalProducto() {//esto es del alert del producto
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No se podrá revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, quiero borrarlo',
      preConfirm: () => {
        return [
          this.borrarProducto()
        ]
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Borrado!',
          'El producto ha sido eliminado',
          'success'
        )
      }
    })
  }
  showModalCalesita() {//esto es del alert de la calesita
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No se podrá revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, quiero borrarlo',
      preConfirm: () => {
        return [
          this.borrarCalesita()
        ]
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Borrado!',
          'La imagen ha sido eliminada',
          'success'
        )
      }
    })
  }

  agregarProducto() { //un metodo para agregar un producto
    if (this.producto.valid) {
      let nuevoProducto: Producto = {
        nombre: this.producto.value.nombre!,
        marca: this.producto.value.marca!,
        precio: this.producto.value.precio!,
        categoria: this.producto.value.categoria!,
        descripcion: this.producto.value.descripcion!,
        imagen: "",
        imagen1: "",
        imagen2: "",
        idproductos: '',
      };
      this.storage.subirImagen(this.nombre, this.imagen,"productos").then(
        resp => {
          this.storage.obtenerUrlImage(resp)
            .then(
              url => {
                this.servicioProductos.creatProducto(nuevoProducto, url).then(producto => {
                  console.log(producto)
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'El producto se ha subido correctamente',
                    showConfirmButton: false,
                    timer: 1500
                  })

                })
                  .catch((error) => {
                    Swal.fire({ //es una alerta de sweetalert2
                      icon: 'error',
                      title: 'Oops...',
                      text: 'No pudo ser cargado correctamente',
                    })
                  }
                  )
              }
            )
        }
      )
    }
    else {
      Swal.fire({ //es una alerta de sweetalert2
        icon: 'error',
        title: 'Hey...',
        text: 'El formulario no está completo',
      })
    }
  }

  //muestra el dialogo del producto
  mostrarDialogoProducto() {
    this.textBoton = 'Agregar Producto';
    this.producto.reset();
    this.modalVisible = true;

  }

  //para editar producto
  editarProducto() {
    let datos: Producto = {
      nombre: this.producto.value.nombre!,
      marca: this.producto.value.marca!,
      precio: this.producto.value.precio!,
      categoria: this.producto.value.categoria!,
      descripcion: this.producto.value.descripcion!,
      imagen: this.productoSeleccionado.imagen,
      imagen2: this.productoSeleccionado.imagen2,
      imagen1: this.productoSeleccionado.imagen1,
      idproductos: this.productoSeleccionado.idproductos,
    };
    this.servicioProductos
      .modificarProducto(this.productoSeleccionado.idproductos, datos)
      .then((producto) => {
        Swal.fire({//es una alerta de sweetalert2
          position: 'top-end',
          icon: 'success',
          title: 'El producto se ha subido correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      });
  }

  //muestra el formulario para editarlo del producto
  mostrarEditar(productoSeleccionado: Producto) {
    this.productoSeleccionado = productoSeleccionado;
    this.textBoton = 'Editar Producto';
    this.modalVisible = true;

    this.producto.setValue({
      nombre: productoSeleccionado.nombre,
      marca: productoSeleccionado.marca,
      precio: productoSeleccionado.precio,
      categoria: productoSeleccionado.categoria,
      descripcion: productoSeleccionado.descripcion,
      
    });
  }

  //carga los datos del producto
  cargarDatos() {
    if (this.textBoton == 'Agregar Producto') {
      this.agregarProducto();
    } else if (this.textBoton == 'Editar Producto') {
      this.editarProducto();
    }
    //se resentean los datos
    this.modalVisible = false;
    this.producto.reset();
  }

  //muestra el eliminar del producto
  mostrarEliminar(productoSeleccionado: Producto) {
    this.showModalProducto()
    this.productoSeleccionado = productoSeleccionado;
  }


  //borra el producto
  borrarProducto() {
    this.servicioProductos
      .eliminarProducto(this.productoSeleccionado.idproductos)
  }
  //se cargan las imagenes con su url
  cargarImagen(event: any) {
    let archivo = event.target.files[0];
    //nos lee lo nuevo
    let reader = new FileReader();
    if (archivo != undefined) {
      reader.readAsDataURL(archivo);
      //que se quiere que se haga con lo que se lee
      reader.onloadend = () => {
        let url = reader.result;
        if (url != null) {
          this.nombre = archivo.name;
          this.imagen = url.toString();
        }
      };
    }
  }


  //ESTO ES DE CALESITA-----------------------------------------------------------------------------------------------------------------------
  agregarCalesita() {
    if (this.calesita.valid) {
      let nuevoCalesita: Calesita = {
        imagen: '',
        idcalesita: '',
      };
      this.storage.subirImagen(this.nombre, this.imagen, "calesita").then(

        resp => {
          console.log(this.imagen)
          this.storage.obtenerUrlImage(resp)
            .then(
              url => {
                this.servicioCalesita.creatCalesita(nuevoCalesita, url).then(calesita => {
                  console.log(calesita)
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'La imagen se ha subido correctamente',
                    showConfirmButton: false,
                    timer: 1500
                  })

                })
                  .catch((error) => {
                    Swal.fire({ //es una alerta de sweetalert2
                      icon: 'error',
                      title: 'Oops...',
                      text: 'No pudo ser cargado correctamente',
                    })
                  }
                  )
              }
            )
        }
      )
    }
  }

  //muestra el dialogo de calesita
  mostrarDialogoCalesita() {
    this.textBoton = 'Agregar Calesita';

    this.modalVisibleCalesita = true;
  }

  //permite editar los datos o el formulario
  editarCalesita() {
    this.storage.subirImagen(this.nombre,this.imagen,'calesita').then(
      resultado=>{
        this.storage.obtenerUrlImage(resultado).then(
          url=>{
            let datos: Calesita = {
              imagen: url,
              idcalesita: this.calesitaSeleccionado.idcalesita,
            };
            this.servicioCalesita
              .modificarCalesita(this.calesitaSeleccionado.idcalesita, datos)
              .then((calesita) => {
                Swal.fire({ //es una alerta de sweetalert2
                  position: 'top-end',
                  icon: 'success',
                  title: 'El producto se ha subido correctamente',
                  showConfirmButton: false,
                  timer: 1500
                })
              });
          }
        )
      }
    )
    
  }
  
  //muestra lo que se puede editar
  mostrarEditarCalesita(calesitaSeleccionado: Calesita) {
    this.calesitaSeleccionado = calesitaSeleccionado;
    this.textBoton = 'Editar Calesita';
    this.modalVisibleCalesita = true;
  }

  cargarDatosCalesita() {
    if (this.textBoton == 'Agregar Calesita') {
      this.agregarCalesita();
    } else if (this.textBoton == 'Editar Calesita') {
      this.editarCalesita();
    }
    //se resentean los datos
    this.modalVisibleCalesita = false;
    this.calesita.reset();
  }

  mostrarEliminarCalesita(calesitaSeleccionado: Calesita) {
    this.showModalCalesita()
    this.calesitaSeleccionado = calesitaSeleccionado;
  }

  //BORRA LAS IMAGENES DE CALESITA
  borrarCalesita() {
    this.servicioCalesita
      .eliminarCalesita(this.calesitaSeleccionado.idcalesita)
      

  }

  //se cargan las imagenes con su url
  cargarImagen2(event: any) {
    let archivo = event.target.files[0];
    //nos lee lo nuevo
    let reader = new FileReader();
    if (archivo != undefined) {
      reader.readAsDataURL(archivo);
      //que se quiere que se haga con lo que se lee
      reader.onloadend = () => {
        let url = reader.result;
        if (url != null) {
          this.nombre = archivo.name;
          this.imagen = url.toString();
        }
      };
    }
  }
}