import { Router } from "express";
import { logger } from "../utils/loggers";
import session from "express-session";
import { storeOptions } from "../api/storeOptions";
import cookieParser from "cookie-parser";
import { crear5Productos } from "../controller/testController";
import minimist from "minimist";
import os from "os";

const othersRoute: Router = Router();

othersRoute.use(cookieParser());
othersRoute.use(session(storeOptions));

const args = minimist(process.argv);

othersRoute.get("/test-fake-products", async (req, res) => {
  logger.info("METODO:" + req.method + " RUTA:" + req.url);
  res.json({ ProductosFake: await crear5Productos() });
});
othersRoute.get("/info", (req, res) => {
  logger.info("METODO:" + req.method + " RUTA:" + req.url);
  res.json({
    "Directorio actual de trabajo": process.cwd(),
    "id ID Del proceso actual": process.pid,
    "Version de NodeJs corriendo": process.version,
    "Titulo del proceso": process.title,
    "Sistema Operativo": process.platform,
    "Uso de memoria": JSON.stringify(process.memoryUsage()),
    "Cantidad de procesadores": os.cpus().length,
    port: args.port,
  });
});

export default othersRoute;
