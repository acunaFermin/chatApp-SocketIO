import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/servicio/websocket.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styles: [
  ]
})
export class MensajesComponent implements OnInit {
  nombre:string= 'fermin'

  constructor( wsService: WebsocketService ) { 

    this.nombre = wsService.usuario.nombre;
  }

  ngOnInit(): void {
  }

}
