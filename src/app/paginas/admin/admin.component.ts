import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/servicios/productos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  coleccionProductos: Producto[] = [];
  constructor(private servicioProductos: ProductosService, private storage: StorageService) { } //se declara en privado 
  nombre:string;

  ngOnInit(): void {
    this.servicioProductos.obtenerProducto().subscribe((producto) => (this.coleccionProductos = producto));
  }
  //se hace un arreglo con formgroup con cada dato que tenga
  producto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    categoria: new FormControl('', Validators.required),
    // imagen: new FormControl('', Validators.required),
  });
  //se declara y se declaran sus tipos o valores
  imagen: string;
  textBoton: string;
  productoSeleccionado: Producto;
  coleccionProducto: Producto[] = [];
  eliminarVisible: boolean = false;
  modalVisible: boolean = false;

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
      this.storage.subirImagen(this.nombre,this.imagen).then(
        resp=>{
          this.storage.obtenerUrlImage(resp)
          .then(
            url=>{
              this.servicioProductos.creatProducto(nuevoProducto,url).then(producto => {
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
  }

  //muestra el dialogo del producto
  mostrarDialogoProducto() {
    this.textBoton = 'Agregar Producto';

    this.modalVisible = true;
    this.producto.reset();

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
          this.imagen = url.toString();
        }
      };
    }
  }
}
