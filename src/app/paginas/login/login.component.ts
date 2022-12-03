import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

/* Crear un grupo de formularios con dos controles de formulario, nombre de usuario y contraseña. */
  Usuarios = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  coleccionUsuario: Usuarios[] = [];
  colUsuario:Usuarios[]=[]


  constructor(private serviciosUsuarios: UsuariosService,private router: Router  ) { }
  
  ngOnInit(): void {
    this.serviciosUsuarios.obtenerUsuarios().subscribe(
      usuarios=>this.colUsuario = usuarios
    )
  }
/* Una función que permite al usuario iniciar sesión en la aplicación. */
  iniciaSesion(){
    this.serviciosUsuarios.login(this.Usuarios,this.colUsuario)
    this.router.navigateByUrl("/").then(
      reDirectTo=>window.location.reload()
    )
    
  }
}
