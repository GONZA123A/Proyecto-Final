import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-labial',
  templateUrl: './labial.component.html',
  styleUrls: ['./labial.component.css']
})
export class LabialComponent implements OnInit {

   productoSeleccionado:Producto
  modalVisible:boolean=false;
  producto: string[]=[]; //creamos un arreglo vacío
  labial: Producto[]=[]; //en el arreglo colocamos la interface de producto

  constructor(private servicioProductos: ProductosService) { //creamos una propiedad que contenga el valor del servicio de productos
  }

  coleccionProductos: Producto[]=[]; //creamos una coleccion productos que contenga la interface del model llamado Producto


  ngOnInit(): void {
    
    this.servicioProductos.obtenerProducto().subscribe(producto => { //se llama al servicio de producto y se obtienen los datos guardados, con la suscripcion se pide que se muestre la coleccion de productos y el mostrar labial
      this.coleccionProductos = producto
      this.mostrarLabial() 
    });
      
  }
  showBasicDialog(info:Producto){
    this.modalVisible=true;
    this.productoSeleccionado=info;

    }
  mostrarLabial(){ //mostrar labial tiene la coleccion de productos que contiene el producto, donde se guardan los formularios o datos guardados
    this.coleccionProductos.forEach(producto=>{
      if(producto.categoria==="labial"){ //si los datos en la categoria son iguales a labial, aparecerán en la card que tiene el html de Labial
        this.labial.push(producto)
      }
    })
  }

}