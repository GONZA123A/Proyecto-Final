import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/servicios/productos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/servicios/storage.service';
import { CalesitaService } from 'src/app/servicios/calesita.service';
import { Calesita } from 'src/app/models/calesita';

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
    // imagen: new FormControl('', Validators.required),
  });
  //se hace un arreglo con formgroup con cada dato que tenga
  calesita = new FormGroup({
    imagen: new FormControl('', Validators.required),
  });

  //se declara y se declaran sus tipos o valores
  imagen: string;
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

  agregarProducto() { //un metodo para agregar un producto
    if (this.producto.valid) {
      let nuevoProducto: Producto = {
        nombre: this.producto.value.nombre!,
        marca: this.producto.value.marca!,
        precio: this.producto.value.precio!,
        categoria: this.producto.value.categoria!,
        imagen: "",
        idproductos: '',
      };
      this.storage.subirImagen(this.nombre, this.imagen,"productos").then(
        resp => {
          this.storage.obtenerUrlImage(resp)
            .then(
              url => {
                this.servicioProductos.creatProducto(nuevoProducto, url).then(producto => {
                  console.log(producto)
                  alert("El producto fue agregado con éxito");

                })
                  .catch((error) => {
                    alert("El producto no pudo ser cargado\nERROR")
                  }
                  )
              }
            )
        }
      )
    }
    else {
      alert("el formulario no esta completo");
    }
  }

  //muestra el dialogo del producto
  mostrarDialogoProducto() {
    this.textBoton = 'Agregar Producto';

    this.modalVisible = true;

  }

  //para editar producto
  editarProducto() {
    let datos: Producto = {
      nombre: this.producto.value.nombre!,
      marca: this.producto.value.marca!,
      precio: this.producto.value.precio!,
      categoria: this.producto.value.categoria!,
      imagen: this.productoSeleccionado.imagen,
      idproductos: this.productoSeleccionado.idproductos,
    };
    this.servicioProductos
      .modificarProducto(this.productoSeleccionado.idproductos, datos)
      .then((producto) => {
        alert('Se modifico el Producto');
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
    this.eliminarVisible = true;
    this.productoSeleccionado = productoSeleccionado;
  }


  //borra el producto
  borrarProducto() {
    this.servicioProductos
      .eliminarProducto(this.productoSeleccionado.idproductos)
      .then((resp) => {
        alert('El Producto fue eliminado');
      });
    //para que se cierre el alerta passa
    this.eliminarVisible = false;
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
        imagen:'',
        idcalesita: '',
      };
      this.storage.subirImagen(this.nombre, this.imagen,"calesita").then(
  
        resp => {
          console.log(this.imagen)
          this.storage.obtenerUrlImage(resp)
            .then(
              url => {
                  this.servicioCalesita.creatCalesita(nuevoCalesita, url).then(calesita => {
                  console.log(calesita)
                  alert("la calesita  fue agregado con éxito");

                })
                  .catch((error) => {
                    alert("la calesita no pudo ser cargado\nERROR")
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
    let datos: Calesita = {
      imagen: this.calesitaSeleccionado.imagen,
      idcalesita: this.calesitaSeleccionado.idcalesita,
    };
    this.servicioCalesita
      .modificarCalesita(this.calesitaSeleccionado.idcalesita, datos)
      .then((calesita) => {
        alert('Se modifico la imagen');
      });
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
    this.eliminarVisibleCalesita = true;
    this.calesitaSeleccionado = this.calesitaSeleccionado;
  }

  borrarCalesita() {
    this.servicioCalesita
      .eliminarCalesita(this.calesitaSeleccionado.idcalesita)
      .then((resp) => {
        alert('La imagen fue eliminada');
      })
      .catch((err) => {
        console.log('no pudo ser eliminada' + err);
      });
    //para que se cierre el alerta passa
    this.eliminarVisibleCalesita = false;
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

