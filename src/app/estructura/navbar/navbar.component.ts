import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Usuarios } from 'src/app/models/usuario';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Router } from '@angular/router';
import { LoginWithGoogleService } from 'src/app/login-with-google.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  logueado = false

  //declaraciones
  items: MenuItem[] = [];
  adminVisible = false;

   //modalvisible es para mostrar el form
   modalVisible : boolean = false;


  constructor(private router:Router, private login:UsuariosService,private google:LoginWithGoogleService) { }

  ngOnInit():void{
    this.logueado = this.login.estaLogueado()
    this.google.getUser()
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
            label: "Todos",
            icon: "",
            routerLink: "/productos"
          },
          {
            label: "Ojos",
            icon: "",
            routerLink: "/ojos"
          },
          {
            label: "Labios",
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
        label: "Administrador",
        icon: "pi pi-user",
        routerLink: "/admin",
        
      }
    ];
  }
  goToLogin(){
    this.router.navigateByUrl("Login")
  }

  iniciarSesionConGoogle(){
    this.google.loginWithGoogle()
    this.ngOnInit()
  }

  cerrarSesionConGoogle(){
    this.google.logOut()
  }


  CerrarSesion(){
    this.login.logOut()
    this.router.navigateByUrl("/")
    this.ngOnInit()
  }}
