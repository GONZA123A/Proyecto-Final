import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-ojos',
  templateUrl: './ojos.component.html',
  styleUrls: ['./ojos.component.css']
})
export class OjosComponent implements OnInit {
  productoSeleccionado:Producto
  modalVisible:boolean=false;
  producto: string[]=[]; //creamos un arreglo vacío
  ojos: Producto[]=[]; //en el arreglo colocamos la interface de producto

  constructor(private servicioProductos: ProductosService) { //creamos una propiedad que contenga el valor del servicio de productos
  }

  coleccionProductos: Producto[]=[]; //creamos una coleccion productos que contenga la interface del model llamado Producto


  ngOnInit(): void {
    
    this.servicioProductos.obtenerProducto().subscribe(producto => { //se llama al servicio de producto y se obtienen los datos guardados, con la suscripcion se pide que se muestre la coleccion de productos y el mostrar ojos
      this.coleccionProductos = producto
      this.mostrarOjos() 
    });
      
  }
  showBasicDialog(info:Producto){
    this.modalVisible=true;
    this.productoSeleccionado=info;

    }
  mostrarOjos(){ //mostrar ojos tiene la coleccion de productos que contiene el producto, donde se guardan los formularios o datos guardados
    this.coleccionProductos.forEach(producto=>{
      if(producto.categoria==="ojos"){ //si los datos en la categoria son iguales a ojos, aparecerán en la card que tiene el componente ojos
        this.ojos.push(producto)
      }
    })
  }
}