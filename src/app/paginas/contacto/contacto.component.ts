import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Mensaje } from 'src/app/models/mensaje';
import Swal from 'sweetalert2'; //esto es una prueba

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  mensaje = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    correoElectronico: new FormControl('', Validators.required),
    mensaje: new FormControl('', Validators.required),

  })

  textBoton: string;
  constructor(private servicioMensaje: MensajesService) { }

  ngOnInit(): void {
  }

  /* La función agregaMensaje() se llama cuando el usuario hace clic en el botón "Enviar" en el formulario. los
   función comprueba si el formulario es válido, si lo es, crea un nuevo objeto de tipo Mensaje y envía
   a la base de datos de Firebase. Si el formulario no es válido, muestra un mensaje de error
    */
  agregaMensaje() {
    if (this.mensaje.valid) {
      let nuevoMensaje: Mensaje = {
        nombre: this.mensaje.value.nombre!,
        apellido: this.mensaje.value.apellido!,
        correoElectronico: this.mensaje.value.correoElectronico!,
        mensaje: this.mensaje.value.mensaje!,
        idMensaje: ""
      }

      this.servicioMensaje.creatMensaje(nuevoMensaje).then((mensaje) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El Mensaje ha sido enviado correctamente.',
          showConfirmButton: false,
          timer: 1500
        })
      })
        .catch((error) => {
          Swal.fire({ //es una alerta de sweetalert2
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudo enviar el mesanje correctamente',
          })
        }
        )
    }
    else {
      Swal.fire({ //es una alerta de sweetalert2
        icon: 'error',
        title: 'Hey...',
        text: 'El formulario no está completo',
      })
    }

  }
  /* La función cargarDatos() se llama cuando el usuario hace clic en el botón. Se cambia el texto del botón.
     "Agregar Mensaje" y se llama a la función agregaMensaje(). Luego se restablece el formulario.
    */
  cargarDatos() {
    this.textBoton == "Agregar Mensaje";
    this.agregaMensaje();
    //se resentean los datos
    this.mensaje.reset();
  }


}