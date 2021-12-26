import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
	providedIn: 'root',
})
export class ChatService {
	constructor(public wsService: WebsocketService) {}

	sendMessage(mensaje: string) {
		const payload = {
			de: this.wsService.usuario.nombre,
			cuerpo: mensaje,
		};

		this.wsService.emit('mensaje', payload);
	}

	getMessages() {
		this.wsService.listen('mensaje-nuevo');
	}

	getPrivateMessages() {
		this.wsService.listen('mensaje-privado');
	}

	getUsuariosConectados() {
		this.wsService.listen('usuarios-conectados');
	}
}
