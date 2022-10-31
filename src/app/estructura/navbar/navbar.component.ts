import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];

  constructor() { }

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
        routerLink: "/admin"
      }
    ];
  }
}
