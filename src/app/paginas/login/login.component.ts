import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuarios } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Usuarios = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  coleccionUsuario: Usuarios[] = [];
  colUsuario:Usuarios[]=[]


  constructor(private serviciosUsuarios: UsuariosService  ) { }
  
  ngOnInit(): void {
    this.serviciosUsuarios.obtenerUsuarios().subscribe(
      usuarios=>this.colUsuario = usuarios
    )
  }
  iniciaSesion(){
    this.serviciosUsuarios.login(this.Usuarios,this.colUsuario)
  }
 
}