import { DaoMongoDB } from "./daos/mongodb";
import minimist from "minimist"
import { logger } from "../../utils/loggers";
import { messagesSchema } from "./schema/message.schema";

let dao : DaoMongoDB;
const args = minimist(process.argv)


switch(args.database.toLowerCase()) {
    case 'mongo':
        if(args){
            dao = new DaoMongoDB('menssages', messagesSchema);
            dao.initMongoDB();
            break;
        }
            
    default:
        logger.error("Error en factory de messages al seleccionar Db (inicinado con la default)")
        dao = new DaoMongoDB('menssages', messagesSchema);
        dao.initMongoDB();
        break;
};

export function getDao(){
    return dao;
};