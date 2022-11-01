import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './login.guard';
import { AdminComponent } from './paginas/admin/admin.component';
import { ContactoComponent } from './paginas/contacto/contacto.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { LoginComponent } from './paginas/login/login.component';
import { NosotrosComponent } from './paginas/nosotros/nosotros.component';
import { ProductosComponent } from './paginas/productos/productos.component';

const routes: Routes = [
  {path:'',component:InicioComponent},
  {path:'inicio',component:InicioComponent},
  {path:'contacto',component:ContactoComponent},
  {path:'nosotros',component:NosotrosComponent},
  {path:'productos',component:ProductosComponent},
  {path:'admin',component:AdminComponent, canActivate :[LoginGuard]},
  {path:'login',component:LoginComponent},





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
