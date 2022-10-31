import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  coleccionProductos: Producto[]=[]; 
 
  producto: string[]=[]; //creamos un arreglo vacío
  labial: Producto[]=[]
  constructor(private servicioProductos: ProductosService){}


  ngOnInit(): void {
    this.servicioProductos.obtenerProducto().subscribe(producto =>{
      this.coleccionProductos = producto
      this.mostrarLabial()
    }
      );

  }

  mostrarLabial(){
    this.coleccionProductos.forEach(producto=>{
      if(producto.categoria==="Labial"){
        this.labial.push(producto)
      }
    })
  }

}
