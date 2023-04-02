import minimist from "minimist";
import { logger } from "../../utils/loggers";
import DaoMongoDB from "./daos/mongodb";
import usersSchema from "./schema/users.schema";

let dao: DaoMongoDB;

const args = minimist(process.argv);

if (args.database) {
  const database = args.database.toLowerCase();
  switch (database) {
    case "mongo":
      dao = new DaoMongoDB("users", usersSchema);
      dao.initMongoDB();
      break;
    default:
      logger.error("Error al querer seleccionar DB en users");
      dao = new DaoMongoDB("users", usersSchema);
      dao.initMongoDB();
      break;
  }
} else {
  dao = new DaoMongoDB("users", usersSchema);
  dao.initMongoDB();
}

export function getDao() {
  return dao;
}
