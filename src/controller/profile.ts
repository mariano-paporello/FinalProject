import { Request, Response } from "express";
import { logger } from "../utils/loggers";

export const profileGet = (req: Request, res: Response) => {
  logger.info("METODO:" + req.method + " RUTA:" + req.url);
  res.json({
    data: req.session.dataUser,
  });
};
