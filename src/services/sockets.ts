const io = require("socket.io");
import jwt from "jsonwebtoken";
import { createMessage } from "../api/messages";
import { cartGet } from "../controller/cart";
import config from "../config";
import { tipos } from "../models/messages/messages.interface";
import { logger } from "../utils/loggers";
import { getOrders } from "../api/orders";
import { getProducts } from "../api/products";
import { repositoryUser } from "../models/users/user.repository";
import { generateToken } from "../controller/user";

const initWsServer = (server: unknown) => {
  const SocketServer = io(server);

  SocketServer.on("connection", (socket: any, req: Request) => {
    socket.emit("bienvenidaAUsuario", {
      Bienvenida: "hola",
    });
    socket.on(
      "sendUserPassword",
      async (data: { username: string; password: string }) => {
        const user = await repositoryUser.logIn(data.username, data.password);

        if (user) {
          const token = await generateToken(user);
          socket.emit("devuelvoToken", token);
        }
      }
    );
    socket.on(
      "resp-message",
      async (data: { token: string; message: string }) => {
        const { token, message } = data;
        if (token && message) {
          let jwtObject: any;
          const user = jwt.verify(token, config.JWT_SECRET_KEY, (err, user) => {
            if (err) {
              logger.error(err);
              return false;
            } else if (user) {
              jwtObject = user;
              return user;
            }
          });
          if (typeof user === "object" && jwtObject) {
            const newMessage = {
              userId: jwtObject.userId,
              type: tipos.Usuario,
              message: message,
            };
            const messageComplete = await createMessage(newMessage);
            socket.emit("imprimirMensaje", messageComplete);
          } else {
            logger.error("No authorizado");
            socket.emit("errorNoAutorizado", user);
          }
        }
      }
    );
    socket.on("mensajeYaImpreso", async (data: any) => {
      const message = data.message.toLowerCase();
      switch (message) {
        case "stock": {
          const productos = await getProducts();
          if (Array.isArray(productos)) {
            const response = productos
              .map((element) => {
                return `||Producto: ${element.title}.
              Precio: ${element.price}.
              Stock: ${element.stock}.
              Category: ${element.category}
              Imagen: <img src=${element.thumbnail} alt=${element.thumbnail}>.`;
              })
              .join("    ");
            if (response) {
              const messageFromSistem = {
                userId: data.userId,
                type: tipos.Sistema,
                message: response,
              };
              const messageComplete = await createMessage(messageFromSistem);
              socket.emit("sistemResponse", messageComplete);
              break;
            }
          }
          break;
        }
        case "orden": {
          const ordenes = await getOrders(data.userId);
          const response = ordenes
            .map((element) => {
              return `||Id de orden: ${element._id}.
            Estado: ${element.state}.
            Total: $${element.total}.`;
            })
            .join("    ");
          if (response) {
            const messageFromSistem = {
              userId: data.userId,
              type: tipos.Sistema,
              message: response,
            };
            const messageComplete = await createMessage(messageFromSistem);
            socket.emit("sistemResponse", messageComplete);
            break;
          }
          break;
        }
        case "carrito": {
          const cart = await cartGet(data.userId);
          if (cart && cart?.length > 0) {
            const response = cart?.map((element) => {
              return `||Producto en Carrito: 
            Nomber: ${element?.title}.
            Precio total: ${element?.price}.
            Cantidad: ${element?.amount}.`;
            });
            if (response) {
              const messageFromSistem = {
                userId: data.userId,
                type: tipos.Sistema,
                message: response.join("    "),
              };
              const messageComplete = await createMessage(messageFromSistem);
              socket.emit("sistemResponse", messageComplete);
              break;
            }
          } else {
            const cartVacio = { message: "Carrito vacio" };
            socket.emit("sistemResponse", cartVacio);
          }
        }
        default: {
          const response = `/------------------------------------------------------------------------------------------/
          / Hola! No he podido comprender tu mensaje. Profavor ingresa una de las siguentes opciones /
          /     - Stock: Para conocer nuestro stock actual.                                          /
          /     - Orden: Para conocer la informacion de tu ultima orden.                             /
          /     - Carrito: Para conocer el estado actual de tu carrito.                              /
          /------------------------------------------------------------------------------------------/`;

          const messageFromSistem = {
            userId: data.userId,
            type: tipos.Sistema,
            message: response,
          };
          const messageComplete = await createMessage(messageFromSistem);
          socket.emit("sistemResponse", messageComplete);
        }
      }
    });
  });
  return SocketServer;
};
export default initWsServer;
