import { DaoMongoDB } from "./daos/mongodb";
import minimist from "minimist";
import { cartSchema } from "./schema/cart.schema";
import { logger } from "../../utils/loggers";

let dao: DaoMongoDB;
const args = minimist(process.argv);
if (args.database) {
  const database = args.database.toLowerCase();
  switch (database) {
    case "mongo":
      dao = new DaoMongoDB("carts", cartSchema);
      dao.initMongoDB();
      break;
    default:
      logger.error(
        "Error al querer seleccionar DB en Carrito(iniciando con la default)"
      );
      dao = new DaoMongoDB("carts", cartSchema);
      dao.initMongoDB();
      break;
  }
} else {
  dao = new DaoMongoDB("carts", cartSchema);
  dao.initMongoDB();
}

export function getDao() {
  return dao;
}
