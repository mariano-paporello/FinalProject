import { DaoMongoDB } from "./daos/mongodb";
import minimist from "minimist"
import { logger } from "../../utils/loggers";
import { orderSchema } from "./schema/orders.schema";

let dao : DaoMongoDB;
const args = minimist(process.argv)

if(args.database){
const database = args.database.toLowerCase()
switch(database) {
    case 'mongo':
        if(args){
            dao = new DaoMongoDB('orders', orderSchema);
            dao.initMongoDB();
            break;
        }
            
    default:
        logger.error("Error en factory de orders al seleccionar Db(iniciando con la default)")
        dao = new DaoMongoDB('orders', orderSchema);
        dao.initMongoDB();
        break;
}}else{
    dao = new DaoMongoDB('orders', orderSchema);
    dao.initMongoDB();
}

export function getDao(){
    return dao;
};