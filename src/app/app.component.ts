import { Component, OnInit } from '@angular/core';
import { ChatService } from './servicio/chat.service';
import { WebsocketService } from './servicio/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private wsService: WebsocketService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.chatService.getPrivateMessages();

    this.wsService.mensajePrivadoRecibido.subscribe((msj) => {
      console.log('app.componenet', msj);
    });
  }
}
