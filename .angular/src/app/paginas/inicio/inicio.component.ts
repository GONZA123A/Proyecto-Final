import { Component, OnInit } from '@angular/core';
import { Calesita } from 'src/app/models/calesita';
import { CalesitaService } from 'src/app/servicios/calesita.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  calesita: string[]=[];
  coleccionCalesita: Calesita []=[];
  
  constructor(private servicioCalesita: CalesitaService) { }

  ngOnInit(): void {
    this.servicioCalesita.obtenerCalesita().subscribe(calesita => this.coleccionCalesita = calesita);
  }
}
