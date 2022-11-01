import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './paginas/admin/admin.component';
import { ContactoComponent } from './paginas/contacto/contacto.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { LabialComponent } from './paginas/labial/labial.component';
import { NosotrosComponent } from './paginas/nosotros/nosotros.component';
import { OjosComponent } from './paginas/ojos/ojos.component';
import { ProductosComponent } from './paginas/productos/productos.component';
import { RostroComponent } from './paginas/rostro/rostro.component';

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
  {
    path:'ojos',component:OjosComponent
  },
  {
    path:'labios',component:LabialComponent
  },
  {
    path:'rostro',component:RostroComponent
  },
  {
    path:'admin',component:AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
