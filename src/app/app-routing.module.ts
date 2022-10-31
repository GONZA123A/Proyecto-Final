import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactoComponent } from './paginas/contacto/contacto.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { NosotrosComponent } from './paginas/nosotros/nosotros.component';
import { ProductosComponent } from './paginas/productos/productos.component';

const routes: Routes = [
  {
    path:'',component:InicioComponent
  },
  {
    path:'inicio',component:InicioComponent
  },
  {
    path:'contacto',component:ContactoComponent
  },
  {
    path:'nosotros',component:NosotrosComponent
  },
  {
    path:'productos',component:ProductosComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
