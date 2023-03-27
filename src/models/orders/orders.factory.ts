import { DaoMongoDB } from "./daos/mongodb";
import minimist from "minimist"
import { logger } from "../../utils/loggers";
import { orderSchema } from "./schema/orders.schema";

let dao : DaoMongoDB;
const args = minimist(process.argv)


switch(args.database.toLowerCase()) {
    case 'mongo':
        if(args.testing){
            dao = new DaoMongoDB('orders', orderSchema);
            dao.initMongoDB();
            break;
        }
            
    default:
        logger.error("Error en factory al seleccionar Db")
        break;
};

export function getDao(){
    return dao;
};