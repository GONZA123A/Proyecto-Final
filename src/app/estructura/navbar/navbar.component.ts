import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Usuario } from 'src/app/models/usuario';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  //declaraciones
  items: MenuItem[] = [];
  adminVisible = false;
  coleccionUsuario: Usuario[] = [];

  Usuario = new FormGroup({
    usuario: new FormControl ('', Validators.required),
    contrasena: new FormControl ('', Validators.required)
  })

  constructor(private serviciosUsuarios: UsuariosService) { }

  // Menu e items
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
      // el admin se oculta mientras el usuario no se haya logueado
      {
        label: "Admin",
        icon: "pi pi-user",
        routerLink: "/admin",
        visible: this.adminVisible,
      }
    ];
    this.serviciosUsuarios.obtenerUsuarios().subscribe(usuarios=>this.coleccionUsuario=usuarios)

  }
  
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

}
