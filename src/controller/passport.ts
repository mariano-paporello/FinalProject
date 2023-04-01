import { logger } from "../utils/loggers";
import { repositoryUser } from "../models/users/user.repository";
import { ifCartExist } from "./cart";
import { UserObject } from "../models/users/user.interface";
import { Request } from "express";
import { User } from "../../public/types";

// CAMBIAR LA LOGICA PARA PODER PASARLO A CAPAS
export const searchUser = async (
  req: Request,
  username: string,
  password: string,
  done: (error: any, user?: any, info?: any) => void
) => {
  try {
    console.log(username, password);
    const user: UserObject | null | undefined = await repositoryUser.logIn(
      username,
      password
    );
    if (user && typeof user !== "boolean") {
      await ifCartExist(user);
      req.session.dataUser = user;
      req.session.gmail = user.gmail;
      if (user.admin) {
        req.session.admin = user.admin;
      }
      return done(null, user);
    } else if (typeof user === "boolean") {
      return done(null, false, {
        msg: "Usuario no encontrado debido a que dio false",
      });
    } else {
      return done(null, false, {
        msg: "Usuario no encontrado debido a que dio undefined",
      });
    }
  } catch (err) {
    logger.error("Error: ", err);
  }
};
export const createUser = async (
  req: Request,
  username: string,
  password: string,
  done: (error: any, user?: any, info?: any) => void
) => {
  try {
    const { gmail, age, phoneNumber, image, address } = req.body;
    if (gmail && age && phoneNumber && image && password && username) {
      const user: User = await repositoryUser.singUp({
        gmail,
        password,
        age,
        phoneNumber,
        image,
        username,
        admin: false,
        address,
      });
      req.session.gmail = user.gmail;
      await ifCartExist(user);
      return done(null, user);
    }
    return done(null, false, {
      message: "Error debido a falta de alguno de los campos.",
    });
  } catch (err) {
    return done(null, false, { mensaje: "Error Inesperado", err });
  }
};
