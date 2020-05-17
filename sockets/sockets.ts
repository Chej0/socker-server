import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosLista();

// conectar cliente
export const conectarCliente = (cliente: Socket) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}

export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        usuariosConectados.borrarUsuario(cliente.id);
        console.log(usuariosConectados.getLista());
    });
}

// escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('mensaje', (payload: { de:string, cuerpo:string }) => {
        console.log('MENSAJE RECIBIDO', payload);
        io.emit('mensaje-nuevo', payload);
    });
}

// configurando usuario
export const usuario = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('configuar-usuario', (payload: { nombre:string }, callback: Function) => {
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre }, configurado`
        });
        console.log(usuariosConectados.getLista());

    });
}