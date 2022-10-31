import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Usuarios } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  Usuario = new FormGroup({
    usuario: new FormControl ('', Validators.required),
    contrasena: new FormControl ('', Validators.required)
  })

  //declaraciones
  items: MenuItem[] = [];
  adminVisible = false;
  coleccionUsuario: Usuarios[] = [];

   //modalvisible es para mostrar el form
   modalVisible : boolean = false;
   showModalDialog() {
     this.modalVisible = true;
   }

   //MOSTRAMOS EL VERIFICAR USUARIO
  mostrar(){
    this.verificarUsuario();
  }

  verificarUsuario(){
    this.coleccionUsuario.forEach(usuario => {
      if(this.Usuario.valid){
        if(usuario.usuario===this.Usuario.value.usuario!){
          if(usuario.contrasena===this.Usuario.value.contrasena!){
            alert ("Inicio sesión correctamente")
            this.adminVisible=true;
            this.ngOnInit()
          }else{
            alert ("La contraseña es incorrecta")
          }
        }
        else{
          alert ("algunos de los datos son incorrectos")
        }
      }else{
        alert("los campos están vacios")
      }
      this.modalVisible=false;
      this.Usuario.reset();
    });
  }

  constructor(private serviciosUsuarios: UsuariosService) { }

  ngOnInit():void{
    this.items = [
      {
        label: "Inicio",
        icon: "pi pi-home",
        routerLink: "/inicio"
      },
      {
        label: "Nosotros",
        icon: "pi pi-users",
        routerLink: "/nosotros"
      },
      {
        label: "Contacto",
        icon: "pi pi-phone",
        routerLink: "/contacto"
      },
      {
        label: "Productos",
        icon: "pi pi-list",
        items: [
          {
            label: "Ojos",
            icon: "",
            routerLink: "/ojos"
          },
          {
            label: "Labial",
            icon: "",
            routerLink: "/labial"
          },
          {
            label: "Rostro",
            icon: "",
            routerLink: "/rostro"
          }
        ]
      },
      {
        label: "Admin",
        icon: "pi pi-user",
        routerLink: "/admin",
        visible: this.adminVisible,
      }
    ];
    this.serviciosUsuarios.obtenerUsuarios().subscribe(usuarios=>this.coleccionUsuario=usuarios)
  }

}
