import { repositoryMessage } from "../models/messages/messages.respository"

const io = require('socket.io')


const initWsServer =  (server:unknown) =>  {
    const SocketServer = io(server)

    SocketServer.on('connection', (socket:any, req: Request) => {
        socket.emit('bienvenidaAUsuario', 'Bienvenido Nuevo Usuario')
        socket.emit('bienvenidaAUsuario', {
            Bienvenida: 'hola'
        })
        socket.on('enviarNuevoUser', (data:any)=>{
            const nuevoUser = {
                id: socket.client.id,
                ...data
            }
            
            socket.emit("UsuarioConfirmadoYGuardado", nuevoUser)
        })
        socket.on('enviarMensaje', async(data:any)=>{
            
            const dataSi = await repositoryMessage.createMessage(data)
            SocketServer.emit('imprimirMensaje', dataSi)
            
            
            
        })
        socket.on("enviarUserLoginName",  (data:any)=>{
            socket.emit("userSaved", data)
        })
    })
    return SocketServer
}  
module.exports= initWsServer