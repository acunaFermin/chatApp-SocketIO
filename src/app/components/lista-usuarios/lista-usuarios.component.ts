import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/servicio/chat.service';
import { WebsocketService } from 'src/app/servicio/websocket.service';

@Component({
	selector: 'app-lista-usuarios',
	templateUrl: './lista-usuarios.component.html',
	styles: [],
})
export class ListaUsuariosComponent implements OnInit {
	listaUsuariosConectados!: Observable<any>;

	constructor(
		private wsService: WebsocketService,
		private chatService: ChatService
	) {
		this.chatService.getUsuariosConectados();
	}

	ngOnInit(): void {
		this.listaUsuariosConectados = this.wsService.usuariosConectados;
	}
}
