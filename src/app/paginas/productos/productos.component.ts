import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  producto: string[]=[]; //creamos un arreglo vacío
  productoSeleccionado:Producto
  modalVisible:boolean=false;

  constructor(private servicioProductos: ProductosService) { //creamos una propiedad que contenga el valor del servicio de productos
  }

  coleccionProductos: Producto[]=[]; //creamos una coleccion productos que contenga la interface del model llamado Producto


  ngOnInit(): void {
    
    this.servicioProductos.obtenerProducto().subscribe(producto => {
      this.coleccionProductos = producto
    });
      
  }
  showBasicDialog(info:Producto){
    this.modalVisible=true;
    this.productoSeleccionado=info;
    }
  }