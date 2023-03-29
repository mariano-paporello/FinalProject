import { DaoMongoDB } from "./daos/mongodb";
import minimist from "minimist"
import { cartSchema } from "./schema/cart.schema";
import { logger } from "../../utils/loggers";

let dao:DaoMongoDB;
const args = minimist(process.argv)


switch(args.database.toLowerCase()) {
    // agregar mÁs DB
    case 'mongo':
        dao = new DaoMongoDB('carts', cartSchema);
        dao.initMongoDB();
        break;
    default:
        logger.error("Error al querer seleccionar DB en Carrito(iniciando con la default)")
        dao = new DaoMongoDB('carts', cartSchema);
        dao.initMongoDB();
        break;
};


export function getDao(){
    return dao;
};