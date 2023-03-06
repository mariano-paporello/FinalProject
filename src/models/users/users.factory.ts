import minimist from "minimist"
import { logger } from "../../utils/loggers";
import DaoMongoDB from "./daos/mongodb";
import usersSchema  from "./schema/users.schema";


let dao:DaoMongoDB;

const args = minimist(process.argv)
switch(args.database.toLowerCase()) {
    // agregar mÁs DB
    case 'mongo':
        dao = new DaoMongoDB('users', usersSchema);
        dao.initMongoDB();
        break;
    default:
        logger.error("Error al querer seleccionar DB en users")
        break;
};


export function getDao(){
    return dao;
};