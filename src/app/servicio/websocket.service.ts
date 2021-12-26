import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';

@Injectable({
	providedIn: 'root',
})
export class WebsocketService extends Socket {
	public usuario!: Usuario;

	mensajeRecibido: EventEmitter<any> = new EventEmitter();
	mensajePrivadoRecibido: EventEmitter<any> = new EventEmitter();
	usuariosConectados: EventEmitter<{}> = new EventEmitter();

	constructor() {
		super({
			url: 'http://localhost:5500/',
		});
		this.cargarStorage();
		this.checkStatus();
	}

	public socketStatus = false;

	checkStatus() {
		this.ioSocket.on('connect', () => {
			console.log('conectado al servidor');
			this.socketStatus = true;
			this.cargarStorage();
		});

		this.ioSocket.on('disconnect', () => {
			console.log('desconectado al servidor');
			this.socketStatus = false;
		});
	}

	emit(event: string, payload: any) {
		this.ioSocket.emit(event, payload);
	}

	listen = (evento: any) => {
		return this.ioSocket.on(evento, (msg: any) => {
			console.log(msg);
			if (evento == 'mensaje-nuevo') {
				this.mensajeRecibido.emit(msg);
			}
			if (evento == 'mensaje-privado') {
				this.mensajePrivadoRecibido.emit(msg);
			}
			if (evento == 'usuarios-conectados') {
				this.usuariosConectados.emit(msg);
			}
		});
	};

	loginWS(nombre: string) {
		return new Promise<void>((resolve, reject) => {
			this.ioSocket.emit('config-usuario', { nombre }, (resp: any) => {
				console.log(resp);

				localStorage.setItem('user id', resp.id);

				this.usuario = new Usuario(nombre);

				this.guardarStorage();

				resolve();
			});
		});
	}

	guardarStorage() {
		localStorage.setItem('usuario', JSON.stringify(this.usuario));
	}

	cargarStorage() {
		if (localStorage.getItem('usuario')) {
			this.usuario = JSON.parse(localStorage.getItem('usuario')!);
			this.loginWS(this.usuario.nombre);
		}
	}

	getUsuario() {
		return this.usuario;
	}
}
