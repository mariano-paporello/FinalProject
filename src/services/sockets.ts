const io = require("socket.io");
import jwt from "jsonwebtoken";
import { createMessage } from "../api/messages";
import config from "../config";
import { tipos } from "../models/messages/messages.interface";
import { logger } from "../utils/loggers";

const initWsServer = (server: unknown) => {
  const SocketServer = io(server);

  SocketServer.on("connection", (socket: any, req: Request) => {
    socket.emit("bienvenidaAUsuario", {
      Bienvenida: "hola",
    });
    socket.on(
      "recibimosTokenYmensaje",
      async (data: { token: string; message: string }) => {
        const { token, message } = data;
        let jwtObject: any
        const user = jwt.verify(token, config.JWT_SECRET_KEY, (err, user) => {
          if (err) {
            console.log(err)
            return false;
          } else if (user) {
            jwtObject = user
            return user;
          }
        });
        if(typeof user === "object" && jwtObject){
          const newMessage = {
            userId: jwtObject.userId,
            type: tipos.Usuario,
            message: message
          }
          const messageComplete = await createMessage(newMessage)
        socket.emit('imprimirMensaje', messageComplete)
        }else{
          logger.error("NO authorizado")
          socket.emit('errorNoAuthorizado', user)
        }
      }
    );
    socket.on("enviarUserLoginName", (data: any) => {
      socket.emit("userSaved", data);
    });
  });
  return SocketServer;
};
export default initWsServer;
